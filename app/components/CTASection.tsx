"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-8 px-4">
      <motion.div
        className="max-w-4xl mx-auto bg-orange-500 rounded-3xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-white/90 text-sm mb-2">Khai phá tiềm năng cơ thể: Người bạn đồng hành cùng sức khỏe</p>
        <h2 className="text-2xl font-bold text-white mb-4">Tải Ứng Dụng Ngay Hôm Nay</h2>
        <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
          Trải nghiệm các bài tập giãn cơ và phục hồi chuyên sâu ngay trên điện thoại. 
          Hãy để EasyStretch giúp bạn có một cơ thể linh hoạt và tràn đầy năng lượng mỗi ngày.
        </p>
        <motion.button
          className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-6 h-6 fill-white" />
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider">Get it on</p>
            <p className="text-lg font-semibold -mt-1">Google Play</p>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
