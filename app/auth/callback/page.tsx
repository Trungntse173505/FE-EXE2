"use client";

import { useEffect } from "react";
import { useGoogleLogin } from "@/app/hooks/useGoogleLogin";
import { motion } from "framer-motion";

export default function AuthCallbackPage() {
  const { handleAuthCallback } = useGoogleLogin();

  useEffect(() => {
    // Xử lý callback khi component mount
    handleAuthCallback();
  }, [handleAuthCallback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Đang xác thực...</h2>
        <p className="text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
      </motion.div>
    </div>
  );
}
