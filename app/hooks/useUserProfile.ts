"use client";

import { useState, useEffect } from "react";
import { getUserProfile, UserProfile } from "@/app/api/users";
import { ApiResponse } from "@/app/api/auth";

interface UseUserProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<ApiResponse<UserProfile>>;
}

export function useUserProfile(token: string | null): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (): Promise<ApiResponse<UserProfile>> => {
    if (!token) {
      setIsLoading(false);
      return { success: false, error: "No token provided" };
    }

    setIsLoading(true);
    setError(null);

    const response = await getUserProfile(token);

    if (response.success && response.data) {
      setProfile(response.data);
    } else {
      setError(response.error || "Failed to fetch user profile");
    }

    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
}
