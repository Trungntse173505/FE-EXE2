import { API_URL } from "@/app/config/api";
import { ApiResponse } from "./auth";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  created_at: string;
  is_active: boolean;
  price: number;
  img_url: string;
}

export interface BoughtCourse {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  courses: Course;
}

export async function getCourses(): Promise<ApiResponse<Course[]>> {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export async function getBoughtCourses(token: string): Promise<ApiResponse<BoughtCourse[]>> {
  try {
    const response = await fetch(`${API_URL}/courses/bought`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    // API returns { error, data, count, status, statusText }
    return {
      success: true,
      data: data.data || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
