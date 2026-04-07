"use client";

import { useState, useEffect } from "react";
import { getCourses, Course } from "@/app/api/courses";
import { ApiResponse } from "@/app/api/auth";

interface UseCoursesReturn {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<ApiResponse<Course[]>>;
}

export function useCourses(): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (): Promise<ApiResponse<Course[]>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getCourses();
      
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        setError(response.error || "Không thể tải danh sách khóa học");
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
    fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
    refetch: fetchCourses,
  };
}
