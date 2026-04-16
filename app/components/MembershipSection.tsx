"use client";

import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { useAuthContext } from "@/app/context/AuthContext";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import Link from "next/link";

const VIP_COURSE_ID = "49414f0c-ea91-4ded-bd2d-3536c2ea82e5";

const defaultPlans = [
  {
    name: "Miễn phí",
    priceVnd: "0Đ",
    description: "Dành cho người mới bắt đầu",
    buttonText: "Dùng ngay",
    buttonStyle: "bg-gray-900 text-white hover:bg-gray-800",
    features: [
      "Đăng ký bài tập",
      "Truy cập các bài tập giãn cơ cơ bản",
      "Theo dõi tiến trình tập luyện hằng ngày",
      "Lộ trình tập luyện tiêu chuẩn"
    ],
    cardStyle: "bg-gray-50 border-gray-200",
    textColor: "text-gray-900",
    subTextColor: "text-gray-500",
    featureColor: "text-gray-600",
    checkColor: "text-green-500",
    badge: null
  },
  {
    name: "Hội viên VIP",
    priceVnd: "99.000Đ",
    description: "Dành cho người muốn trải nghiệm đầy đủ",
    buttonText: "Dùng ngay",
    buttonStyle: "bg-white text-gray-900 hover:bg-gray-100",
    popular: true,
    features: [
      "Mọi tính năng Miễn phí",
      "Mở khóa 100% video bài tập cao cấp",
      "Video thiết kế chuyên sâu",
      "Tương tác & tư vấn cùng chuyên gia dinh dưỡng AI",
      "Quản lý dinh dưỡng & phục hồi toàn diện",
      "Truy cập mọi tính năng mới nhất"
    ],
    cardStyle: "bg-gray-900 border-gray-800",
    textColor: "text-white",
    subTextColor: "text-gray-400",
    featureColor: "text-gray-300",
    checkColor: "text-green-400",
    badge: null
  }
];

export default function MembershipSection() {
  const { token, isAuthenticated } = useAuthContext();
  const { profile, isLoading } = useUserProfile(token);

  const isVIP = profile?.is_subscriber === "active";

  const getLoggedInPlans = () => [
    {
      ...defaultPlans[0],
      buttonText: "Đã có",
      buttonStyle: "bg-green-100 text-green-700 cursor-default",
      badge: "Gói hiện tại"
    },
    {
      ...defaultPlans[1],
      buttonText: isVIP ? "Đã nâng cấp" : "Nâng cấp ngay",
      buttonStyle: isVIP 
        ? "bg-green-500 text-white cursor-default" 
        : "bg-white text-gray-900 hover:bg-gray-100",
      popular: !isVIP,
      badge: isVIP ? "VIP Active" : null
    }
  ];

  const plans = isAuthenticated && !isLoading ? getLoggedInPlans() : defaultPlans;

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Các Gói
          </h2>
          <p className="text-xl text-gray-500">
            {isAuthenticated && !isLoading
              ? isVIP 
                ? "Bạn đang sử dụng gói VIP. Tận hưởng tất cả tính năng cao cấp!" 
                : "Nâng cấp lên VIP để trải nghiệm đầy đủ tính năng"
              : "Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng! Không giới hạn, không áp lực."}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-8 border-2 ${plan.cardStyle}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}
              
              {/* Popular Badge (only if no custom badge) */}
              {!plan.badge && plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Phổ biến nhất
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-lg font-semibold mb-2 ${plan.textColor}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className={`text-4xl font-bold ${plan.textColor}`}>
                  {plan.priceVnd}
                </span>
                <span className={`text-sm ${plan.subTextColor}`}>
                  /tháng
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm mb-6 ${plan.subTextColor}`}>
                {plan.description}
              </p>

              {/* CTA Button */}
              {plan.name === "Member VIP" && !isVIP ? (
                <Link href="/membership/payment">
                  <motion.span
                    className={`block w-full text-center py-3 rounded-full font-medium mb-8 transition-colors cursor-pointer ${plan.buttonStyle}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.buttonText}
                  </motion.span>
                </Link>
              ) : (
                <motion.button
                  className={`w-full py-3 rounded-full font-medium mb-8 transition-colors ${plan.buttonStyle}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.buttonText}
                </motion.button>
              )}

              {/* Features */}
              <div>
                <p className={`text-sm font-semibold mb-4 ${plan.textColor}`}>
                  Tính năng
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.checkColor}`} />
                      <span className={`text-sm ${plan.featureColor}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
