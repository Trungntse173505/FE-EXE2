"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, ChevronLeft, Dumbbell, Calendar, X } from "lucide-react";
import { useAuthContext } from "@/app/context/AuthContext";
import { useBoughtCourseDetail } from "@/app/hooks/useBoughtCourseDetail";
import Link from "next/link";
import { useState } from "react";

function formatPrice(price: number): string {
  if (price === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

interface PlayingVideo {
  url: string;
  title: string;
}

interface CourseDay {
  id: string;
  title: string;
  day_number: number;
  week_number: number;
  phase_number: number;
  course_day_exercises: {
    exercises: {
      id: string;
      title: string;
      description: string;
      duration: number;
      video_url: string[];
      target_muscle: string[];
    };
    order_index: number;
  }[];
}

// Week Tabs Component
function WeekTabs({ days, onPlayVideo }: { days: CourseDay[]; onPlayVideo: (v: PlayingVideo) => void }) {
  const [activeWeek, setActiveWeek] = useState(1);

  // Group days by week
  const weeks = days.reduce((acc, day) => {
    const weekNum = day.week_number;
    if (!acc[weekNum]) acc[weekNum] = [];
    acc[weekNum].push(day);
    return acc;
  }, {} as Record<number, CourseDay[]>);

  const weekNumbers = Object.keys(weeks).map(Number).sort((a, b) => a - b);

  return (
    <div>
      {/* Week Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekNumbers.map((weekNum) => (
          <button
            key={weekNum}
            onClick={() => setActiveWeek(weekNum)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeWeek === weekNum
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Tuần {weekNum}
            <span className="ml-2 text-xs font-normal opacity-80">
              ({weeks[weekNum].length} ngày)
            </span>
          </button>
        ))}
      </div>

      {/* Days in Active Week */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {weeks[activeWeek]
            ?.sort((a, b) => a.day_number - b.day_number)
            .map((day, index) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Day Header */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      {day.day_number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{day.title}</h3>
                      <p className="text-sm text-gray-500">
                        {day.course_day_exercises.length} bài tập
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div className="divide-y divide-gray-100">
                  {day.course_day_exercises
                    .sort((a, b) => a.order_index - b.order_index)
                    .map(({ exercises }) => (
                      <div
                        key={exercises.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          {/* Exercise Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Play className="w-4 h-4 text-green-500" />
                              <h4 className="font-medium text-gray-900">
                                {exercises.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                              {exercises.description}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {exercises.duration}s
                              </span>
                              {exercises.target_muscle?.map((muscle) => (
                                <span
                                  key={muscle}
                                  className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full"
                                >
                                  {muscle}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Play Button */}
                          {exercises.video_url?.length > 0 && (
                            <button
                              onClick={() => onPlayVideo({
                                url: exercises.video_url[0],
                                title: exercises.title
                              })}
                              className="flex-shrink-0 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Xem
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function BoughtCourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { token, isAuthenticated } = useAuthContext();
  const { course, isLoading, error } = useBoughtCourseDetail(
    courseId as string,
    token
  );
  const [playingVideo, setPlayingVideo] = useState<PlayingVideo | null>(null);

  if (!isAuthenticated) {
    router.push(`/login?redirect=/courses/${courseId}`);
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Không tìm thấy khóa học"}</p>
          <Link
            href="/courses"
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Quay lại
          </Link>
        </div>
      </div>
    );
  }

  // Sort course_days by week_number then day_number
  const sortedDays = [...course.course_days].sort((a, b) => {
    if (a.week_number !== b.week_number) {
      return a.week_number - b.week_number;
    }
    return a.day_number - b.day_number;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại danh sách
          </Link>
        </div>
      </div>

      {/* Course Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
        >
          <div className="relative h-64 md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                course.img_url && course.img_url.startsWith("http")
                  ? course.img_url
                  : "/snapedit_1774632388843-removebg-preview 1.png"
              }
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full mb-3">
                Đã mua
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {course.title}
              </h1>
              <p className="text-white/80">{course.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span>{sortedDays.length} ngày tập</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-green-500" />
                <span>Level: {course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">
                  {formatPrice(course.price)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Weeks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Lộ trình tập luyện</h2>

          {/* Week Tabs */}
          <WeekTabs days={sortedDays} onPlayVideo={setPlayingVideo} />
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gray-900">
                <h3 className="text-white font-medium truncate pr-4">
                  {playingVideo.title}
                </h3>
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video */}
              <div className="aspect-video">
                <video
                  src={playingVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
