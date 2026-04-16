"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Tải xuống", href: "#download" },
    { name: "Tính năng", href: "#features" },
    { name: "Cách hoạt động", href: "#how-it-works" },
    { name: "AI", href: "#ai" },
    { name: "Gói thành viên", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ],
  connect: [
    { name: "Facebook", href: "https://www.facebook.com/people/EasyStretch/61587162646480/" },
    { name: "TikTok", href: "https://www.tiktok.com/@easystretchhiha" },
  ],
  legal: [
    { name: "Điều khoản sử dụng", href: "/terms" },
    { name: "Chính sách bảo mật", href: "#" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              #1 ứng dụng giãn cơ trên CH Play
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Ứng dụng giãn cơ được đánh giá cao nhất - được xây dựng để giúp bạn tập tốt hơn, 
              duy trì đều đặn và thấy kết quả.
            </p>
            <motion.a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tải xuống cho Android
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/snapedit_1774632388843-removebg-preview 1.png"
                alt="EasyStretch Logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-bold text-lg">EasyStretch</span>
            </div>
            <p className="text-gray-400 text-sm">
              Giãn cơ thông minh
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kết nối</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Xây dựng</h4>
            <p className="text-green-400 font-semibold">phiên bản tốt hơn</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Bản quyền thuộc về EasyStretch
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
