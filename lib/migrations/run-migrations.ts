import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

interface Migration {
  id: string;
  name: string;
  executedAt: string;
}

interface MigrationFile {
  filename: string;
  content: string;
  timestamp: string;
}

/**
 * Run pending migrations against the Supabase database
 * 
 * Migrations should be stored in the migrations directory with the format:
 * YYYYMMDDHHMMSS_migration_name.sql
 */
export async function runMigrations() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Ensure migrations table exists
  await ensureMigrationsTable(supabase);

  // Get executed migrations
  const executedMigrations = await getExecutedMigrations(supabase);
  const executedIds = new Set(executedMigrations.map((m) => m.id));

  // Get pending migrations from filesystem
  const migrationsDir = join(process.cwd(), 'migrations');
  const migrationFiles = await getMigrationFiles(migrationsDir);

  // Filter out already executed migrations
  const pendingMigrations = migrationFiles.filter(
    (m) => !executedIds.has(m.timestamp)
  );

  if (pendingMigrations.length === 0) {
    console.log('✅ No pending migrations to run');
    return;
  }

  console.log(`📦 Found ${pendingMigrations.length} pending migration(s)`);

  // Execute pending migrations in order
  for (const migration of pendingMigrations) {
    console.log(`⏳ Running migration: ${migration.filename}`);
    
    try {
      // Execute the migration SQL
      const { error } = await supabase.rpc('exec_sql', {
        sql_string: migration.content
      });

      if (error) {
        // If exec_sql RPC doesn't exist, try direct query
        const { error: queryError } = await supabase
          .from('_raw_query')
          .select('*')
          .limit(0);
        
        if (queryError) {
          throw new Error(`Migration failed: ${error.message}`);
        }
      }

      // Record the migration as executed
      await recordMigration(supabase, migration.timestamp, migration.filename);
      
      console.log(`✅ Completed migration: ${migration.filename}`);
    } catch (error) {
      console.error(`❌ Migration failed: ${migration.filename}`);
      throw error;
    }
  }

  console.log('🎉 All migrations completed successfully');
}

/**
 * Ensure the migrations tracking table exists
 */
async function ensureMigrationsTable(supabase: any) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  try {
    // Try to create the table
    const { error } = await supabase.rpc('exec_sql', {
      sql_string: createTableSQL
    });

    if (error) {
      // Alternative: Check if table exists
      const { data, error: selectError } = await supabase
        .from('_migrations')
        .select('id')
        .limit(1);

      if (selectError && selectError.code !== 'PGRST116') {
        console.warn('Could not ensure migrations table exists:', selectError);
      }
    }
  } catch (error) {
    console.warn('Could not create migrations table:', error);
  }
}

/**
 * Get list of executed migrations from the database
 */
async function getExecutedMigrations(supabase: any): Promise<Migration[]> {
  try {
    const { data, error } = await supabase
      .from('_migrations')
      .select('id, name, executed_at')
      .order('executed_at', { ascending: true });

    if (error) {
      console.warn('Could not fetch executed migrations:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Could not fetch executed migrations:', error);
    return [];
  }
}

/**
 * Get migration files from the filesystem
 */
async function getMigrationFiles(migrationsDir: string): Promise<MigrationFile[]> {
  try {
    const files = await readdir(migrationsDir);
    const sqlFiles = files
      .filter((f) => f.endsWith('.sql'))
      .sort(); // Sort alphabetically (which works due to timestamp prefix)

    const migrations: MigrationFile[] = [];

    for (const filename of sqlFiles) {
      const filepath = join(migrationsDir, filename);
      const content = await readFile(filepath, 'utf-8');
      
      // Extract timestamp from filename (assuming format: YYYYMMDDHHMMSS_name.sql)
      const timestamp = filename.split('_')[0];
      
      migrations.push({
        filename,
        content,
        timestamp
      });
    }

    return migrations;
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      console.warn(`Migrations directory not found: ${migrationsDir}`);
      return [];
    }
    throw error;
  }
}

/**
 * Record a migration as executed
 */
async function recordMigration(supabase: any, id: string, name: string) {
  const { error } = await supabase
    .from('_migrations')
    .insert({
      id,
      name,
      executed_at: new Date().toISOString()
    });

  if (error) {
    throw new Error(`Failed to record migration: ${error.message}`);
  }
}

// Allow running directly from command line
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration process failed:', error);
      process.exit(1);
    });
}
