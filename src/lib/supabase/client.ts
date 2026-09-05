import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ddalfmqahisfeyhclrpr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWxmbXFhaGlzZmV5aGNscnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NzA3NTMsImV4cCI6MjEwMzU0Njc1M30.kzn8tBj4sqOOgkqwlaDZSRneHO1lS00xriwiiK_t0wA';

// Browser/client-side Supabase client (singleton)
let clientInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
}

// Convenience alias
export const supabase = getSupabaseBrowserClient();
