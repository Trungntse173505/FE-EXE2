import { API_URL } from "@/app/config/api";
import { ApiResponse } from "./auth";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string | null;
  avatar_url: string | null;
  gender: string;
  height_cm: number;
  weight_kg: number;
  created_at: string;
  updated_at: string;
  total_practice_minutes: number;
  current_point: number;
  is_subscriber: "active" | "inactive";
  role: string;
  age: number | null;
  is_active: boolean;
  goal: string;
}

export async function getUserProfile(token: string): Promise<ApiResponse<UserProfile>> {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${token}`,
      },
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
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
