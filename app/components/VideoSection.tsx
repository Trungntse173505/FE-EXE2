"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import VideoCard from "./VideoCard";

const videoCourses = [
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
  { image: "", title: "Mindful Movement", rating: 4.9, activities: 12, duration: "1hr 30min", calories: 15000, instructor: "Albert Hamrich", price: "$150.00" },
];

export default function VideoSection() {
  const [selectedCategory, setSelectedCategory] = useState("Phục Hồi Sau chấn thương");
  const [selectedPrice, setSelectedPrice] = useState("100k - 200k");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-xl font-semibold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Khóa Video Hướng Dẫn
        </motion.h2>

        {/* Filter Bar */}
        <motion.div
          className="bg-white border-2 border-orange-400 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-1">Loại Khóa Học</p>
              <button className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-orange-400">🎯</span>
                {selectedCategory}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-sm font-medium text-gray-700 mb-1">Giá</p>
              <button className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-orange-400">💰</span>
                {selectedPrice}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <motion.button
              className="px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tìm kiếm
            </motion.button>
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <VideoCard {...course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
