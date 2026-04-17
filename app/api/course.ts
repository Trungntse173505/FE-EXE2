import { API_URL } from "@/app/config/api";
import { ApiResponse } from "./auth";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  video_url: string[];
  target_muscle: string[];
  type: string;
  loop_type: string;
  target_value: number;
  rest_after: number;
}

export interface CourseDayExercise {
  exercises: Exercise;
  order_index: number;
}

export interface CourseDay {
  id: string;
  title: string;
  day_number: number;
  week_number: number;
  phase_number: number;
  course_day_exercises: CourseDayExercise[];
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  img_url: string;
  level: string;
  type: string;
  is_active: boolean;
  course_days: CourseDay[];
}

export async function getBoughtCourseDetail(
  courseId: string,
  token: string
): Promise<ApiResponse<CourseDetail>> {
  try {
    const response = await fetch(`${API_URL}/courses/payment/${courseId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `HTTP ${response.status}`,
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
