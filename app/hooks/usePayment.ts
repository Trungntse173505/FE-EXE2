"use client";

import { useState } from "react";
import { createPayment, CreatePaymentRequest, PaymentResponse } from "@/app/api/payment";
import { ApiResponse } from "@/app/api/auth";

interface UsePaymentReturn {
  createPaymentLink: (data: CreatePaymentRequest, token: string) => Promise<ApiResponse<PaymentResponse>>;
  isLoading: boolean;
  error: string | null;
  checkoutUrl: string | null;
}

export function usePayment(): UsePaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const createPaymentLink = async (
    data: CreatePaymentRequest,
    token: string
  ): Promise<ApiResponse<PaymentResponse>> => {
    setIsLoading(true);
    setError(null);
    setCheckoutUrl(null);
    
    try {
      const response = await createPayment(data, token);
      
      if (response.success && response.data) {
        setCheckoutUrl(response.data.checkoutUrl);
      } else {
        setError(response.error || "Không thể tạo link thanh toán");
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
    createPaymentLink,
    isLoading,
    error,
    checkoutUrl,
  };
}
