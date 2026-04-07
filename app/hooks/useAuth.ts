"use client";

import { useState } from "react";
import { apiClient, SignupData, SigninData, OtpData, ApiResponse } from "@/app/api/auth";

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<ApiResponse>;
  signin: (data: SigninData) => Promise<ApiResponse>;
  signout: () => Promise<ApiResponse>;
  getOtp: (data: OtpData) => Promise<ApiResponse>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const signup = async (data: SignupData): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.signup(data);
      
      if (!response.success) {
        setError(response.error || "Đăng ký thất bại");
      }
      
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const signin = async (data: SigninData): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.signin(data);
      
      if (!response.success) {
        setError(response.error || "Đăng nhập thất bại");
      }
      
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async (): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.signout();
      
      if (!response.success) {
        setError(response.error || "Đăng xuất thất bại");
      }
      
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const getOtp = async (data: OtpData): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getOtp(data);
      
      if (!response.success) {
        setError(response.error || "Không thể gửi OTP");
      }
      
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    signup,
    signin,
    signout,
    getOtp,
    clearError,
  };
}
