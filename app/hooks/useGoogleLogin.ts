"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/app/utils/supabase";
import { logGoogleAuth } from "@/app/utils/googleAuthLogger";
import { apiClient } from "@/app/api/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export const useGoogleLogin = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const loginWithGoogle = useCallback(async () => {
    if (isGoogleLoading) return;

    logGoogleAuth.start();
    setApiError("");
    setIsGoogleLoading(true);

    try {
      // Đăng xuất Google trước để hiện lại bảng chọn tài khoản
      await supabase.auth.signOut();
      logGoogleAuth.signInSuccess();

      // Gọi Google OAuth qua Supabase
      // Hardcode URL production
      const siteUrl = "https://www.easystretch.click";
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      logGoogleAuth.supabaseStart();

      // Supabase sẽ redirect tới /auth/callback
      // Xử lý callback ở page /auth/callback

    } catch (error: any) {
      logGoogleAuth.error(error, "initiate OAuth");
      setApiError(error.message || "Đăng nhập bằng Google thất bại");
    } finally {
      setIsGoogleLoading(false);
    }
  }, [isGoogleLoading]);

  // Xử lý callback sau khi Google redirect về
  const handleAuthCallback = useCallback(async () => {
    logGoogleAuth.start();
    setIsGoogleLoading(true);

    try {
      // Đợi Supabase xử lý URL hash (access_token từ Google OAuth)
      // Supabase tự động parse hash khi khởi tạo, nhưng cần đợi 1 chút
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Lấy session từ Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (session) {
        const token = session.access_token;
        const user = session.user;

        logGoogleAuth.supabaseSuccess(user?.id);
        logGoogleAuth.storageStart();

        // 1. Lưu token vào localStorage
        localStorage.setItem("token", token);
        logGoogleAuth.storageSuccess();

        let userToSave = user;
        let hasProfile = false;

        // 2. Gọi API lấy thông tin user từ backend
        logGoogleAuth.apiCall();
        try {
          const profileRes = await apiClient.getInfo();
          if (profileRes && profileRes.data) {
            const backendUser = profileRes.data as any;
            userToSave = backendUser;
            hasProfile = !!(backendUser?.height_cm && backendUser?.weight_kg);
            logGoogleAuth.apiSuccess();
          }
        } catch (e: any) {
          logGoogleAuth.apiFailed(e);
          // Nếu BE chưa xử lý user từ Google, check metadata
          hasProfile = !!(user?.user_metadata?.height_cm && user?.user_metadata?.weight_kg);
        }

        // 3. Lưu user info
        localStorage.setItem("user", JSON.stringify(userToSave));
        logGoogleAuth.checkProfile(hasProfile);

        // 4. Login vào context
        login(token);

        // 5. Điều hướng - giống login thường, về trang chủ
        logGoogleAuth.navigate("/ (home)");
        router.push("/");

        logGoogleAuth.complete();
      } else {
        throw new Error("Không nhận được session từ Supabase");
      }
    } catch (error: any) {
      logGoogleAuth.error(error, "auth callback");
      setApiError(error.message || "Xác thực thất bại");
    } finally {
      setIsGoogleLoading(false);
    }
  }, [login, router]);

  return {
    loginWithGoogle,
    handleAuthCallback,
    isGoogleLoading,
    apiError,
    setApiError,
  };
};
