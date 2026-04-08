"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Utensils } from "lucide-react";

export default function AISection() {
  return (
    <section id="ai" className="py-24 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* AI Food Analysis */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">AI Powered</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Phân tích dinh dưỡng thông minh bằng AI
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Chụp ảnh món ăn, quét mã vạch hoặc mô tả bữa ăn của bạn và nhận ngay thông tin 
              calo và dinh dưỡng chi tiết.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Phone Mockup with Food Image */}
            <div className="relative w-[260px] h-[520px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-green-600/20 rounded-[40px] blur-xl" />
              <div className="relative h-full bg-gray-800 rounded-[36px] p-3 shadow-2xl">
                <div className="h-full bg-black rounded-[28px] overflow-hidden">
                  {/* Food Image */}
                  <Image
                    src="/c2f5f1746f23ee7db732.jpg"
                    alt="Healthy Food"
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center justify-between z-10">
                    <span className="text-xs font-medium text-white drop-shadow">9:41</span>
                    <div className="flex items-center gap-1 text-white drop-shadow">
                      <svg className="w-3 h-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Nutrition Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                      <p className="text-green-400 text-xs font-medium mb-2">EASYSTRETCH</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20 rounded-xl p-2 text-center">
                          <p className="text-white text-lg font-bold">515</p>
                          <p className="text-white/70 text-xs">Calo</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2 text-center">
                          <p className="text-white text-lg font-bold">25g</p>
                          <p className="text-white/70 text-xs">Protein</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2 text-center">
                          <p className="text-white text-lg font-bold">45g</p>
                          <p className="text-white/70 text-xs">Carbs</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2 text-center">
                          <p className="text-white text-lg font-bold">12g</p>
                          <p className="text-white/70 text-xs">Chất béo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Meal Builder */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Chat UI Mockup */}
            <div className="relative max-w-sm mx-auto bg-gray-800 rounded-3xl p-4 shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">EasyStretch AI</span>
                </div>
                
                <div className="bg-gray-700 rounded-2xl rounded-tl-none p-3">
                  <p className="text-sm text-gray-300">Tạo cho tôi bữa ăn 30g protein dưới 500 calo</p>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-green-600 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                    <p className="text-sm">Đang phân tích...</p>
                    <div className="flex gap-1 mt-2">
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-2xl rounded-tl-none p-3">
                  <p className="text-sm text-gray-300 mb-2">Đây là gợi ý bữa ăn cho bạn:</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Ức gà nướng - 200 calo, 35g protein</li>
                    <li>• Salad rau xanh - 100 calo</li>
                    <li>• Cơm gạo lứt - 150 calo</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <p className="text-green-400 text-xs">Tổng: 450 calo | 38g protein</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">AI Powered</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tạo bữa ăn với EasyStretch AI
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nói với AI bạn cần gì, và xem nó xây dựng bữa ăn từng bước một, 
              cân bằng hoàn hảo cho mục tiêu dinh dưỡng của bạn.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
