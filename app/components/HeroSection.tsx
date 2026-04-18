"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserPlus, LogIn } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="download" className="relative pt-24 pb-20 bg-white overflow-hidden">
      {/* Floating Food Emojis */}
      <motion.div
        className="absolute top-20 left-[15%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🧀
      </motion.div>
      <motion.div
        className="absolute top-32 right-[20%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🍗
      </motion.div>
      <motion.div
        className="absolute top-48 left-[8%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🍣
      </motion.div>
      <motion.div
        className="absolute top-40 right-[10%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        🥗
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[12%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        🥩
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[15%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        🥑
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Logo Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
            <Image
              src="/snapedit_1774632388843-removebg-preview 1.png"
              alt="Logo EasyStretch"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ứng dụng Giãn cơ & Phục hồi hàng đầu
        </motion.h1>

        <motion.p
          className="text-xl text-green-500 text-center font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Ứng dụng EasyStretch tất cả trong một
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-base text-gray-500 text-center max-w-2xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tạm biệt cơn đau mỏi vai gáy và cải thiện tư thế chỉ với 15 phút mỗi ngày. 
          Sự kết hợp hoàn hảo giữa Yoga và các bài tập phục hồi chuyên sâu dành riêng cho bạn.
        </motion.p>

        <motion.p
          className="text-base text-gray-600 text-center max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Trải nghiệm EasyStretch App ngay hôm nay! Tiếp cận hàng trăm bài tập video chất lượng cao 
          với sự hướng dẫn chi tiết từ các huấn luyện viên chuyên nghiệp.
        </motion.p>

        {/* Download Button - Android Only */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://play.google.com/store/apps/details?id=com.hiha.easystretch.v2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1526-.5676.4144.4144 0 00-.5676.1526l-2.022 3.5016C16.5902 8.2435 15.3756 7.8672 14 7.8672s-2.5902.3763-3.7368 1.101l-2.022-3.5016a.4144.4144 0 00-.5676-.1526.416.416 0 00-.1526.5676l1.9973 3.4592C5.2798 10.2121 3 12.8354 3 15.9965h18c0-3.1611-2.2798-5.7844-5.1185-6.6751"/>
            </svg>
            Tải xuống cho Android
          </motion.a>
        </motion.div>

        {/* Two Phones - Overlapping */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Phone 1 - Back - Onyx Black frame */}
          <motion.div
            className="relative w-[260px] h-[520px] -rotate-12 z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/Onyx Black 1.png"
              alt="Phone Frame"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Phone 2 - Front - Food image with frame */}
          <motion.div
            className="relative w-[280px] h-[560px] rotate-6 z-20 -ml-16"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            {/* Phone Frame */}
            <Image
              src="/Onyx Black.png"
              alt="Phone Frame"
              fill
              className="object-contain z-10"
              priority
            />
            {/* Screen Content - Food image */}
            <div className="absolute inset-[12px] z-0 overflow-hidden rounded-[34px] bg-black">
              <Image
                src="/c2f5f1746f23ee7db732.jpg"
                alt="Thực phẩm lành mạnh"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-6 left-4 right-4">
                <p className="text-white text-lg font-bold leading-tight">Dinh dưỡng cá nhân hóa bắt đầu từ đây</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-16"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
