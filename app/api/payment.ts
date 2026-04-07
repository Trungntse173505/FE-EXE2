import { API_URL } from "@/app/config/api";
import { ApiResponse } from "./auth";

export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CreatePaymentRequest {
  amount: number;
  description: string;
  items: PaymentItem[];
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  checkoutUrl: string;
  paymentLinkId: string;
  orderCode: string;
  qrCode: string;
}

export async function createPayment(
  data: CreatePaymentRequest,
  token: string
): Promise<ApiResponse<PaymentResponse>> {
  try {
    const response = await fetch(`${API_URL}/payos-payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
