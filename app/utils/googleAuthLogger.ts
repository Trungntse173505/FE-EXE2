// Google Auth Logger - FE
export const logGoogleAuth = {
  start: () => console.log("[GoogleAuth] 🟡 Bắt đầu đăng nhập Google..."),
  
  signInSuccess: (email?: string) => 
    console.log("[GoogleAuth] 🟢 Google Sign-In thành công:", email || "Không có email"),
  
  tokenReceived: () => 
    console.log("[GoogleAuth] 🟢 Nhận được Google ID Token"),
  
  supabaseStart: () => 
    console.log("[GoogleAuth] 🟡 Gửi token lên Supabase..."),
  
  supabaseSuccess: (userId?: string) => 
    console.log("[GoogleAuth] 🟢 Supabase auth thành công, userId:", userId || "Không có userId"),
  
  apiCall: () => 
    console.log("[GoogleAuth] 🟡 Gọi API backend lấy thông tin user..."),
  
  apiSuccess: () => 
    console.log("[GoogleAuth] 🟢 Lấy profile từ API thành công"),
  
  apiFailed: (err: any) => 
    console.log("[GoogleAuth] 🟠 API lỗi, dùng data Supabase:", err?.message || err),
  
  checkProfile: (hasProfile: boolean) => 
    console.log("[GoogleAuth] 🔍 User đã có profile:", hasProfile),
  
  navigate: (screen: string) => 
    console.log("[GoogleAuth] 🟣 Navigate tới:", screen),
  
  storageStart: () => 
    console.log("[GoogleAuth] 🟡 Lưu token & user vào localStorage..."),
  
  storageSuccess: () => 
    console.log("[GoogleAuth] 🟢 Lưu localStorage thành công"),
  
  error: (err: any, step?: string) => 
    console.error(`[GoogleAuth] 🔴 Lỗi${step ? ` tại [${step}]` : ""}:`, err?.message || err),
  
  complete: () => 
    console.log("[GoogleAuth] ✅ Hoàn tất flow đăng nhập Google"),
};
