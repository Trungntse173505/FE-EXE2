"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";
import { ArrowUpRight, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/snapedit_1774632388843-removebg-preview 1.png"
              alt="EasyStretch Logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="font-bold text-gray-900 text-lg">EasyStretch</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#download" className="text-sm text-gray-600 hover:text-gray-900 transition-colors scroll-smooth">
              Tải xuống
            </a>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors scroll-smooth">
              Tính năng
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors scroll-smooth">
              Cách hoạt động
            </a>
            <a href="#ai" className="text-sm text-gray-600 hover:text-gray-900 transition-colors scroll-smooth">
              AI
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors scroll-smooth">
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
                  {user?.full_name || user?.email || "Người dùng"}
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
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              <a 
                href="#download" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tải xuống
              </a>
              <a 
                href="#features" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tính năng
              </a>
              <a 
                href="#how-it-works" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cách hoạt động
              </a>
              <a 
                href="#ai" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI
              </a>
              <a 
                href="#pricing" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gói thành viên
              </a>
              
              <div className="border-t border-gray-100 pt-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user?.full_name || user?.email || "Người dùng"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="block py-2 text-gray-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      href="/register" 
                      className="block py-2 text-gray-900 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
