"use client";

import { useState, useEffect } from "react";
import { getBoughtCourses, BoughtCourse } from "@/app/api/courses";
import { ApiResponse } from "@/app/api/auth";

interface UseBoughtCoursesReturn {
  boughtCourses: BoughtCourse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<ApiResponse<BoughtCourse[]>>;
}

export function useBoughtCourses(token: string | null): UseBoughtCoursesReturn {
  const [boughtCourses, setBoughtCourses] = useState<BoughtCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoughtCourses = async (): Promise<ApiResponse<BoughtCourse[]>> => {
    if (!token) {
      setBoughtCourses([]);
      return { success: true, data: [] };
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getBoughtCourses(token);
      
      if (response.success && response.data) {
        setBoughtCourses(response.data);
      } else {
        setError(response.error || "Không thể tải danh sách khóa học đã mua");
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

  useEffect(() => {
    fetchBoughtCourses();
  }, [token]);

  return {
    boughtCourses,
    isLoading,
    error,
    refetch: fetchBoughtCourses,
  };
}

// Helper function to check if a course is bought
export function isCourseBought(courseId: string, boughtCourses: BoughtCourse[]): boolean {
  return boughtCourses.some((bc) => bc.course_id === courseId);
}
