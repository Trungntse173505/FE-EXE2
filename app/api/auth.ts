import { API_URL, ENDPOINTS } from "@/app/config/api";

// Types
export interface SignupData {
  full_name: string;
  email: string;
  password: string;
  role?: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface OtpData {
  gmail: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  token?: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data,
        message: data.message,
        token: data.metadata?.token || data.token, // Extract token from metadata or root
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // Auth APIs
  async signup(data: SignupData): Promise<ApiResponse> {
    return this.request(ENDPOINTS.auth.signup, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        role: data.role || "user",
      }),
    });
  }

  async signin(data: SigninData): Promise<ApiResponse> {
    return this.request(ENDPOINTS.auth.signin, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async signout(): Promise<ApiResponse> {
    return this.request(ENDPOINTS.auth.signout, {
      method: "POST",
    });
  }

  async getOtp(data: OtpData): Promise<ApiResponse> {
    return this.request(ENDPOINTS.auth.otp, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Get user info with auth token
  async getInfo(): Promise<ApiResponse> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return this.request(ENDPOINTS.auth.me || "/users/me", {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}

export const apiClient = new ApiClient();
