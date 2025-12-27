import { supabase, supabaseConfig } from '../lib/config/supabase';

console.log('🧪 Testing Supabase Connection...\n');

async function testConnection() {
  // 1. Configuration Check
  console.log('1️⃣ Configuration Check:');
  console.log(`   URL: ${supabaseConfig.url}`);
  console.log(`   Configured: ${supabaseConfig.isConfigured ? '✅' : '❌'}\n`);

  // 2. Connection Test
  console.log('2️⃣ Connection Test:');
  try {
    const { data, error } = await supabase
      .from('_health')
      .select('*')
      .limit(1);
    
    if (error && error.code !== 'PGRST204') {
      console.log(`   Status: ❌ Failed - ${error.message}`);
      return false;
    }
    console.log('   Status: ✅ Connected\n');
  } catch (err: any) {
    console.log(`   Status: ❌ Error - ${err.message}\n`);
    return false;
  }

  // 3. Authentication Test
  console.log('3️⃣ Authentication Test:');
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log(`   Session check: ${error ? '❌ Failed' : '✅ Success'}\n`);
  } catch (err) {
    console.log('   Session check: ❌ Failed\n');
  }

  // 4. Database Query Test
  console.log('4️⃣ Database Query Test:');
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log(`   Query execution: ⚠️  Table may not exist yet - ${error.message}\n`);
    } else {
      console.log('   Query execution: ✅ Success\n');
    }
  } catch (err: any) {
    console.log(`   Query execution: ❌ Error - ${err.message}\n`);
  }

  console.log('✅ Connection tests completed!');
  return true;
}

testConnection()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
  });
