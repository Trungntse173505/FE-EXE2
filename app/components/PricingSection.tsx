"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Dành cho người mới bắt đầu",
    features: [
      "Đăng ký bài tập",
      "Truy cập cơ sở dữ liệu",
      "Nhập bài tập thủ công",
      "Tóm tắt calo hàng ngày",
      "Theo dõi tiến độ cơ bản"
    ],
    cta: "Dùng ngay",
    popular: false
  },
  {
    name: "Pro",
    price: "$25",
    period: "/month",
    description: "Dành cho người muốn tự động hóa",
    features: [
      "Mọi tính năng Free",
      "Bài tập AI",
      "Quét ảnh & barcode",
      "Gợi ý thông minh",
      "Phân tích tiến độ đầy đủ",
      "Hỗ trợ ưu tiên"
    ],
    cta: "Dùng ngay",
    popular: true
  },
  {
    name: "Gold",
    price: "$75",
    period: "/month",
    description: "Dành cho người muốn kiểm soát hoàn toàn",
    features: [
      "Mọi tính năng Pro",
      "Phân tích nâng cao",
      "Huấn luyện viên cá nhân",
      "Tích hợp ứng dụng",
      "Xuất dữ liệu & macros"
    ],
    cta: "Dùng ngay",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Gói giá
          </h2>
          <p className="text-xl text-gray-500">
            Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng! Không giới hạn, không áp lực.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  Phổ biến nhất
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-gray-400" : "text-gray-500"}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <motion.button
                className={`w-full py-3 rounded-full font-medium mb-6 transition-colors ${
                  plan.popular
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Bao gồm</p>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.popular ? "text-green-400" : "text-green-500"}`} />
                    <span className={`text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
