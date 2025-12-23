import { createClient } from '@supabase/supabase-js';

// Load environment variables securely
const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that required environment variables are present
if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable. Please check your .env file.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing SUPABASE_ANON_KEY environment variable. Please check your .env file.');
}

// Create Supabase client with secure configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'live-auction-hub@1.0.0',
    },
  },
});

// Log initialization in development
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Supabase client initialized');
  console.log('📍 URL:', supabaseUrl);
}

// Export configuration for testing
export const supabaseConfig = {
  url: supabaseUrl,
  isConfigured: !!(supabaseUrl && supabaseAnonKey),
};
