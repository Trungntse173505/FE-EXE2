"use client";

import { motion } from "framer-motion";
import { Star, Clock, Users } from "lucide-react";

interface VideoCardProps {
  image: string;
  title: string;
  rating: number;
  activities: number;
  duration: string;
  calories: number;
  instructor: string;
  price: string;
}

export default function VideoCard({ title, rating, activities, duration, calories, instructor, price }: VideoCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      whileHover={{ y: -4 }}
    >
      <div className="aspect-[4/3] bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-sm">Yoga Image</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-orange-500 text-xs font-medium">Yoga | Online</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {activities} Activity
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
          <span>{calories}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <span className="text-xs text-gray-600">{instructor}</span>
          </div>
          <span className="text-orange-500 font-semibold text-sm">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}
