"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { signin, isLoading, error, clearError } = useAuth();
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const response = await signin({
      email: formData.email,
      password: formData.password
    });
    
    if (response.success) {
      // Save token via AuthContext (handles localStorage + decode user)
      if (response.token) {
        login(response.token);
      }
      // Redirect to home
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-teal-400/20" />
        
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <Image
                  src="/snapedit_1774632388843-removebg-preview 1.png"
                  alt="EasyStretch"
                  width={60}
                  height={60}
                  className="w-14 h-14"
                />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Chào mừng trở lại!
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Tiếp tục hành trình giãn cơ và phục hồi của bạn. 
              Mỗi ngày một bước tiến gần hơn đến sức khỏe hoàn hảo.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">200k+</p>
                <p className="text-sm text-gray-600">Người dùng</p>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold text-emerald-600">500+</p>
                <p className="text-sm text-gray-600">Bài tập</p>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold text-teal-600">4.9★</p>
                <p className="text-sm text-gray-600">Đánh giá</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start lg:hidden">
            <Image
              src="/snapedit_1774632388843-removebg-preview 1.png"
              alt="EasyStretch Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl text-gray-900">EasyStretch</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-500">Đăng nhập để tiếp tục tập luyện</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white/80"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white/80"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500" />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Quên mật khẩu?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-green-600 font-semibold hover:text-green-700">
              Đăng ký ngay
            </Link>
          </p>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
