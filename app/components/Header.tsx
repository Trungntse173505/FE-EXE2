"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";
import { ArrowUpRight, User } from "lucide-react";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthContext();
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/snapedit_1774632388843-removebg-preview 1.png"
              alt="EasyStretch Logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="font-bold text-gray-900 text-lg">EasyStretch</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#download" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Download
            </a>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Tính năng
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cách hoạt động
            </a>
            <a href="#ai" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              AI
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Gói thành viên
            </a>
          </nav>

          {/* Auth Buttons or User Info */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.full_name || user?.email || "User"}
                </span>
              </div>
              <motion.button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Đăng xuất
              </motion.button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <motion.span
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Đăng nhập
                </motion.span>
              </Link>
              <Link href="/register">
                <motion.span
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Đăng ký
                </motion.span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
