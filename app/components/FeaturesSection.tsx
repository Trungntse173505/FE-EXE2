"use client";

import { motion } from "framer-motion";
import { PlayCircle, Heart, Apple, Droplets } from "lucide-react";

const features = [
  {
    icon: PlayCircle,
    title: "Video giãn cơ",
    description: "Hàng trăm video hướng dẫn giãn cơ chất lượng cao, từ cơ bản đến nâng cao"
  },
  {
    icon: Heart,
    title: "Phục hồi chuyên sâu",
    description: "Lộ trình tập luyện chuyên biệt cho người bị chấn thương, mẹ bầu và sau sinh"
  },
  {
    icon: Apple,
    title: "Dinh dưỡng AI",
    description: "Gợi ý bữa ăn cá nhân hóa với AI theo mục tiêu sức khỏe của bạn"
  },
  {
    icon: Droplets,
    title: "Nhắc nhở uống nước",
    description: "Theo dõi và nhắc nhở uống nước đều đặn để cơ thể luôn đủ nước"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tính năng toàn diện cho sức khỏe của bạn
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
