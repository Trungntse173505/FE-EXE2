"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "EasyStretch là gì và có gì đặc biệt?",
    answer: "EasyStretch là nền tảng tập luyện trực tuyến giúp bạn cải thiện sức khỏe thông qua các bài tập giãn cơ và yoga tại nhà. Điểm đặc biệt là chúng tôi có AI tạo lộ trình cá nhân hóa, tư vấn dinh dưỡng thông minh và đa dạng khóa học từ cơ bản đến nâng cao."
  },
  {
    question: "Có thể xem khóa học miễn phí không?",
    answer: "Có! Gói Miễn phí cho phép bạn đăng ký bài tập, xem hướng dẫn cơ bản và theo dõi lịch sử tập luyện. Nếu muốn truy cập 100% video bài tập cao cấp, tương tác AI chuyên gia và quản lý dinh dưỡng toàn diện, bạn có thể nâng cấp lên gói Hội viên VIP chỉ với 99.000đ/tháng."
  },
  {
    question: "Thanh toán gói VIP như thế nào?",
    answer: "Bạn có thể thanh toán qua PayOS (hỗ trợ nhiều phương thức: thẻ ngân hàng, ví điện tử, QR code). Sau khi thanh toán thành công, tài khoản sẽ được nâng cấp ngay lập tức và bạn có thể truy cập tất cả tính năng VIP."
  },
  {
    question: "Làm sao để theo dõi tiến độ tập luyện?",
    answer: "Hệ thống sẽ tự động ghi lại lịch sử tập luyện của bạn. Bạn có thể xem thống kê hàng ngày, hàng tuần và xu hướng cải thiện theo thời gian. Gói VIP còn có công cụ phân tích chuyên sâu giúp bạn điều chỉnh lộ trình phù hợp."
  },
  {
    question: "Có thể tập trên thiết bị nào?",
    answer: "EasyStretch hoạt động trên mọi thiết bị có trình duyệt web (điện thoại, máy tính bảng, laptop). Giao diện được thiết kế responsive để bạn có trải nghiệm tốt nhất dù tập ở đâu."
  },
  {
    question: "Khóa học có phù hợp với người mới không?",
    answer: "Tuyệt đối phù hợp! Chúng tôi có các khóa học cơ bản dành riêng cho người mới bắt đầu, hướng dẫn từng động tác chi tiết. AI cũng sẽ đề xuất lộ trình phù hợp với trình độ và mục tiêu của bạn."
  }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <button
        className="w-full py-5 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-xl text-gray-500">
            Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng! Không giới hạn, không áp lực.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
