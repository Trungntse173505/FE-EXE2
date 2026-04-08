"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Crown, Check, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";
import { usePayment } from "@/app/hooks/usePayment";
import Header from "@/app/components/Header";

const VIP_COURSE_ID = "960e3154-51cd-487a-a8d6-570bb8aa1b27";
const VIP_TEST_PRICE = 99000; // Actual VIP price
const VIP_DISPLAY_PRICE = 99000; // Same as actual price

function formatPrice(price: number): string {
  if (price === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

const vipFeatures = [
  "Mọi tính năng Free",
  "Mở khóa 100% video bài tập cao cấp",
  "Video thiết kế chuyên sâu",
  "Tương tác & tư vấn cùng chuyên gia dinh dưỡng AI",
  "Quản lý dinh dưỡng & phục hồi toàn diện",
  "Truy cập mọi tính năng mới nhất"
];

export default function MembershipPaymentPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthContext();
  const { createPaymentLink, isLoading: paymentLoading, error, checkoutUrl } = usePayment();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/membership/payment`);
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const handlePayment = async () => {
    if (!token) return;

    const returnUrl = `${window.location.origin}/`;
    const cancelUrl = `${window.location.origin}/membership/payment`;

    await createPaymentLink(
      {
        amount: VIP_TEST_PRICE,
        description: "Nang cap Member VIP",
        items: [
          {
            name: VIP_COURSE_ID,
            quantity: 1,
            price: VIP_TEST_PRICE,
          },
        ],
        returnUrl,
        cancelUrl,
      },
      token
    );
  };

  if (!isAuthenticated) {
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
            href="/#pricing"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Membership Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-sm overflow-hidden text-white"
            >
              <div className="p-8">
                {/* VIP Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                      VIP
                    </span>
                    <h1 className="text-2xl font-bold mt-1">Hội viên VIP</h1>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  Dành cho người muốn trải nghiệm đầy đủ tất cả tính năng cao cấp
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      {formatPrice(VIP_DISPLAY_PRICE)}
                    </span>
                    <span className="text-gray-400">/tháng</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Thanh toán chỉ {formatPrice(VIP_TEST_PRICE)} để kích hoạt
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Tất cả tính năng VIP
                  </h3>
                  <ul className="space-y-3">
                    {vipFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 flex-shrink-0 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
                  <span className="text-gray-600">Gói</span>
                  <span className="font-medium">Hội viên VIP</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Thời hạn</span>
                  <span className="font-medium">1 tháng</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Tổng thanh toán</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(VIP_TEST_PRICE)}
                    </span>
                    <p className="text-xs text-gray-400 line-through">
                      {formatPrice(VIP_DISPLAY_PRICE)}
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: paymentLoading ? 1 : 1.02 }}
                whileTap={{ scale: paymentLoading ? 1 : 0.98 }}
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang tạo link thanh toán...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Thanh toán {formatPrice(VIP_TEST_PRICE)}
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
