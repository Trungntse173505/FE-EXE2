import { createClient } from "@supabase/supabase-js";

// Cấu hình Supabase - chỉ khởi tạo khi có env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Tạo mock client cho build time nếu thiếu env
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[Supabase] ⚠️ Thiếu env variables - chỉ khả dụng ở runtime");
    // Return a dummy client that will be replaced at runtime
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();
