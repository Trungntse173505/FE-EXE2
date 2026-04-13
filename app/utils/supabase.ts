import { createClient } from "@supabase/supabase-js";

// Hardcode Supabase credentials
const supabaseUrl = "https://jwxgmuzrufclvreuvple.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eGdtdXpydWZjbHZyZXV2cGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTU0NzksImV4cCI6MjA4NTY5MTQ3OX0.j547TeTjyjrjB5Ls2rLV7tvgC_PJJqgk74wHwUj7Xx0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
