"use client";

import { useState, useEffect } from "react";
import { getBoughtCourseDetail, CourseDetail } from "@/app/api/course";

export function useBoughtCourseDetail(courseId: string, token: string | null) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !token) {
      setIsLoading(false);
      return;
    }

    const fetchCourseDetail = async () => {
      setIsLoading(true);
      setError(null);

      const response = await getBoughtCourseDetail(courseId, token);

      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        setError(response.error || "Không thể tải chi tiết khóa học");
      }

      setIsLoading(false);
    };

    fetchCourseDetail();
  }, [courseId, token]);

  return { course, isLoading, error };
}
