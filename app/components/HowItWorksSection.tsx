"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle, Apple, Bell } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: PlayCircle,
    title: "Video & Tập luyện",
    description: "Hàng trăm video hướng dẫn chi tiết từ cơ bản đến nâng cao, phù hợp mọi trình độ.",
    image: "/6bfee97c772bf675af3a.jpg"
  },
  {
    number: "2",
    icon: Apple,
    title: "Dinh dưỡng thông minh",
    description: "AI phân tích và gợi ý thực đơn phù hợp, cân bằng dinh dưỡng cho cơ thể bạn.",
    image: "/579f0f1e914910174958.jpg"
  },
  {
    number: "3",
    icon: Bell,
    title: "Nhắc nhở thông minh",
    description: "Tự động nhắc nhở tập luyện, uống nước và theo dõi tiến độ mỗi ngày.",
    image: "/b6ebb1662f31ae6ff720.jpg"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Các Hoạt Động App
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Phone Mockup with real image */}
              <div className="relative w-full max-w-[220px] mx-auto mb-6">
                <div className="relative aspect-[9/19] bg-gray-900 rounded-[36px] p-2 shadow-2xl shadow-gray-900/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-[36px]" />
                  <div className="relative h-full rounded-[28px] overflow-hidden bg-black">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Step Info */}
              <div className="text-center px-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
