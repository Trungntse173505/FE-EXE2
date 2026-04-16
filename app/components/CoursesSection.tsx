"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useCourses } from "@/app/hooks/useCourses";
import { useBoughtCourses, isCourseBought } from "@/app/hooks/useBoughtCourses";
import { useAuthContext } from "@/app/context/AuthContext";
import { PlayCircle, Clock, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const ITEMS_PER_PAGE = 8;

function formatPrice(price: number): string {
  if (price === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatLevel(level: string): string {
  const levelMap: Record<string, string> = {
    beginner: "Cơ bản",
    intermediate: "Trung cấp",
    advanced: "Nâng cao",
    vip: "VIP",
  };
  return levelMap[level.toLowerCase()] || level;
}

export default function CoursesSection() {
  const { courses, isLoading, error } = useCourses();
  const { token, isAuthenticated } = useAuthContext();
  const { boughtCourses } = useBoughtCourses(token);
  const [currentPage, setCurrentPage] = useState(1);

  const HIDDEN_COURSE_ID = "49414f0c-ea91-4ded-bd2d-3536c2ea82e5";

  // Chỉ hiện khóa học is_active, không phải ID bị ẩn, và level là "recover"
  const activeCourses = courses.filter(
    (course) =>
      course.is_active &&
      course.id !== HIDDEN_COURSE_ID &&
      course.level?.toLowerCase() === "recover"
  );
  const totalPages = Math.ceil(activeCourses.length / ITEMS_PER_PAGE);
  
  const paginatedCourses = activeCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Khóa học của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Các khóa học phục hồi chuyên sâu
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Khóa học của chúng tôi
            </h2>
          </div>
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Khóa học của chúng tôi
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Các khóa học phục hồi chuyên sâu, giúp bạn lấy lại phong độ nhanh chóng
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div
          key={currentPage}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paginatedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    course.img_url && course.img_url.startsWith("http")
                      ? course.img_url
                      : "/snapedit_1774632388843-removebg-preview 1.png"
                  }
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Level Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded-full">
                    {formatLevel(course.level)}
                  </span>
                </div>
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      course.price === 0
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {formatPrice(course.price)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    <span>Video</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>15-30 phút</span>
                  </div>
                </div>

                {/* CTA Button - Fixed at bottom */}
                <div className="mt-auto">
                  {isCourseBought(course.id, boughtCourses) ? (
                    <motion.button
                      className="w-full h-11 bg-green-500 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 cursor-default"
                      whileTap={{ scale: 1 }}
                    >
                      <Check className="w-4 h-4" />
                      Đã mua
                    </motion.button>
                  ) : (
                    <Link href={`/payment/${course.id}`}>
                      <motion.span
                        className="w-full h-11 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Mua ngay
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/courses">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Xem tất cả khóa học
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Prev Button */}
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            ))}

            {/* Next Button */}
            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
