"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Clock, PlayCircle, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";
import { usePayment } from "@/app/hooks/usePayment";
import { useCourses } from "@/app/hooks/useCourses";
import Header from "@/app/components/Header";

const VIP_COURSE_ID = "960e3154-51cd-487a-a8d6-570bb8aa1b27";
const VIP_TEST_PRICE = 1000; // 1k for testing

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

export default function PaymentPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { token, isAuthenticated } = useAuthContext();
  const { courses, isLoading: coursesLoading } = useCourses();
  const { createPaymentLink, isLoading: paymentLoading, error, checkoutUrl } = usePayment();
  const [course, setCourse] = useState<typeof courses[0] | null>(null);

  // Check if this is VIP course and use test price
  const isVIPCourse = courseId === VIP_COURSE_ID;
  const displayPrice = course?.price || 0;
  const paymentPrice = isVIPCourse ? VIP_TEST_PRICE : displayPrice;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/payment/${courseId}`);
      return;
    }

    if (courses.length > 0 && courseId) {
      const foundCourse = courses.find((c) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        router.push("/courses");
      }
    }
  }, [courses, courseId, isAuthenticated, router]);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const handlePayment = async () => {
    if (!course || !token) return;

    const returnUrl = `${window.location.origin}/courses`;
    const cancelUrl = `${window.location.origin}/courses`;

    // Tạo orderCode là số (timestamp) - PayOS cần số nguyên
    const orderCode = Date.now();
    
    await createPaymentLink(
      {
        orderCode, // Thêm orderCode số
        amount: paymentPrice,
        description: course.title.slice(0, 25), // PayOS giới hạn 25 ký tự
        items: [
          {
            name: course.title, // Dùng tên khóa học thay vì ID
            quantity: 1,
            price: paymentPrice,
          },
        ],
        returnUrl,
        cancelUrl,
      },
      token
    );
  };

  if (coursesLoading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách khóa học
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
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
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-sm font-medium text-gray-700 rounded-full">
                    {formatLevel(course.level)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h1>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    <span>Video bài tập</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>15-30 phút/buổi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-gray-500">Giá khóa học</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-green-600">
                      {formatPrice(displayPrice)}
                    </span>
                    {isVIPCourse && (
                      <p className="text-sm text-gray-400 line-through">
                        Thanh toán: {formatPrice(paymentPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Thanh toán
              </h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Khóa học</span>
                  <span className="font-medium">{course.title}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Số lượng</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Tổng thanh toán</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-green-600">
                      {formatPrice(paymentPrice)}
                    </span>
                    {isVIPCourse && paymentPrice !== displayPrice && (
                      <p className="text-xs text-gray-400">
                        (Giá gốc: {formatPrice(displayPrice)})
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Bạn sẽ nhận được
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>• Truy cập trọn đời khóa học</li>
                  <li>• Video hướng dẫn chi tiết</li>
                  <li>• Hỗ trợ từ chuyên gia</li>
                  <li>• Chứng nhận hoàn thành</li>
                </ul>
              </div>

              <motion.button
                onClick={handlePayment}
                disabled={paymentLoading || paymentPrice === 0}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: paymentLoading ? 1 : 1.02 }}
                whileTap={{ scale: paymentLoading ? 1 : 0.98 }}
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang tạo link thanh toán...
                  </>
                ) : paymentPrice === 0 ? (
                  "Miễn phí - Đăng ký ngay"
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Thanh toán ngay
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Thanh toán an toàn qua PayOS
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
