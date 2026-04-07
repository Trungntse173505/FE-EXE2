"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useCourses } from "@/app/hooks/useCourses";
import { useBoughtCourses, isCourseBought } from "@/app/hooks/useBoughtCourses";
import { useAuthContext } from "@/app/context/AuthContext";
import { PlayCircle, Clock, ArrowRight, ChevronLeft, ChevronRight, Check, Search, Filter, X } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

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

export default function AllCoursesSection() {
  const { courses, isLoading, error } = useCourses();
  const { token, isAuthenticated } = useAuthContext();
  const { boughtCourses } = useBoughtCourses(token);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    if (!course.is_active) return false;
    
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Level filter
    if (selectedLevel && course.level.toLowerCase() !== selectedLevel.toLowerCase()) {
      return false;
    }
    
    // Price filter
    if (priceRange) {
      if (priceRange === "free" && course.price !== 0) return false;
      if (priceRange === "paid" && course.price === 0) return false;
      if (priceRange === "under50k" && course.price >= 50000) return false;
      if (priceRange === "over50k" && course.price < 50000) return false;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("");
    setPriceRange("");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </Link>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Tất cả khóa học
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá {filteredCourses.length} khóa học giãn cơ và phục hồi sức khỏe
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm kiếm khóa học..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Tất cả cấp độ</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
              <option value="vip">VIP</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Tất cả giá</option>
              <option value="free">Miễn phí</option>
              <option value="paid">Có phí</option>
              <option value="under50k">Dưới 50.000đ</option>
              <option value="over50k">Trên 50.000đ</option>
            </select>

            {/* Clear Filters */}
            {(searchQuery || selectedLevel || priceRange) && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {paginatedCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy khóa học phù hợp</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

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

                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
