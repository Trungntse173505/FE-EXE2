import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng - EasyStretch",
  description: "Điều khoản sử dụng dịch vụ EasyStretch",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ
          </h1>
          <p className="text-gray-500 mb-8">
            Chào mừng bạn đến với Ứng dụng Giãn cơ & Tập luyện (sau đây gọi tắt là &quot;Ứng dụng&quot; hoặc &quot;Chúng tôi&quot;). 
            Bằng việc tải xuống, cài đặt, truy cập hoặc sử dụng Ứng dụng, bạn đồng ý tuân thủ các Điều khoản sử dụng dưới đây. 
            Vui lòng đọc kỹ trước khi bắt đầu sử dụng.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              1. MIỄN TRỪ TRÁCH NHIỆM Y TẾ (QUAN TRỌNG)
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc pl-5">
              <li>
                <strong>Không phải lời khuyên y tế:</strong> Ứng dụng cung cấp các bài tập thể chất, 
                bài tập giãn cơ và thông tin chăm sóc sức khỏe mang tính chất tham khảo. Chúng tôi{" "}
                <strong>không</strong> cung cấp các chẩn đoán, phác đồ điều trị hay lời khuyên y tế chuyên môn.
              </li>
              <li>
                <strong>Rủi ro chấn thương:</strong> Việc tập luyện luôn tiềm ẩn rủi ro chấn thương. 
                Bạn hoàn toàn chịu trách nhiệm về cơ thể và sức khỏe của mình. Nếu bạn có tiền sử bệnh lý, 
                chấn thương cột sống, xương khớp, tim mạch hoặc đang mang thai,{" "}
                <strong>hãy tham khảo ý kiến bác sĩ trước khi bắt đầu bất kỳ bài tập nào.</strong>
              </li>
              <li>
                <strong>Dừng tập khi thấy đau:</strong> Vui lòng dừng tập ngay lập tức và tìm kiếm 
                sự trợ giúp y tế nếu bạn cảm thấy đau nhức bất thường, chóng mặt, buồn nôn hoặc khó thở 
                trong quá trình sử dụng Ứng dụng.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              2. TÀI KHOẢN VÀ BẢO MẬT
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc pl-5">
              <li>
                Để sử dụng các tính năng cá nhân hóa (Nhiệm vụ, Điểm thưởng), bạn cần tạo tài khoản.
              </li>
              <li>
                Bạn cam kết cung cấp thông tin chính xác và có trách nhiệm bảo mật thông tin đăng nhập của mình 
                (tên đăng nhập, mật khẩu).
              </li>
              <li>
                Bạn phải chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của mình. 
                Nếu phát hiện truy cập trái phép, vui lòng thông báo ngay cho chúng tôi để được hỗ trợ.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. GÓI CƯỚC, THANH TOÁN VÀ HOÀN TIỀN
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc pl-5">
              <li>
                <strong>Nội dung Miễn phí & Trả phí:</strong> Ứng dụng cung cấp cả bài tập &quot;Miễn phí&quot; (Free) 
                và bài tập độc quyền cho &quot;Hội viên&quot; (Member - Premium).
              </li>
              <li>
                <strong>Thanh toán:</strong> Để mở khóa các bài tập cho Hội viên, bạn cần đăng ký các gói trả phí 
                theo tháng/năm. Thanh toán sẽ được trừ trực tiếp qua cổng thanh toán được tích hợp sẵn hoặc 
                thông qua App Store/Google Play.
              </li>
              <li>
                <strong>Tự động gia hạn:</strong> Gói cước có thể tự động gia hạn vào cuối chu kỳ. 
                Bạn có thể Hủy tự động gia hạn ít nhất 24 giờ trước khi chu kỳ tiếp theo bắt đầu.
              </li>
              <li>
                <strong>Hoàn tiền:</strong> Việc hủy gói cước sẽ không được hoàn trả lại khoảng thời gian chưa sử dụng 
                (trừ khi có quy định khác tùy theo nền tảng của Apple/Google).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. QUY ĐỊNH VỀ SỬ DỤNG
            </h2>
            <p className="text-gray-600 mb-4">
              Bạn đồng ý sử dụng Ứng dụng cho mục đích cá nhân, phi thương mại. Bạn tuyệt đối KHÔNG được:
            </p>
            <ul className="space-y-3 text-gray-600 list-disc pl-5">
              <li>
                Sao chép, tải xuống trái phép, phân phối lại hoặc bán các video/nội dung bài tập của hệ thống.
              </li>
              <li>
                Sử dụng các phần mềm tự động (bot, tool...) để cheat điểm thưởng, vượt ải nhiệm vụ hoặc hack hệ thống.
              </li>
              <li>
                Xâm phạm hoặc phá hoại hệ thống an ninh mạng của Ứng dụng.
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              Nếu phát hiện vi phạm, Chúng tôi có quyền đơn phương khóa tài khoản của bạn vĩnh viễn 
              mà không cần hoàn tiền hay báo trước.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5. BẢN QUYỀN VÀ SỞ HỮU TRÍ TUỆ
            </h2>
            <p className="text-gray-600">
              Toàn bộ nội dung trên Ứng dụng bao gồm: văn bản, hình ảnh động, video bài tập, logo, 
              mã nguồn, thuật toán xếp lịch tập (Game Giãn cơ) là tài sản trí tuệ thuộc quyền sở hữu 
              của Chúng tôi và được pháp luật bảo hộ.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. SỬA ĐỔI ĐIỀU KHOẢN
            </h2>
            <p className="text-gray-600">
              Chúng tôi có thể cập nhật, sửa đổi toàn bộ hoặc một phần của Điều Khoản Sử Dụng này theo thời gian. 
              Phiên bản mới sẽ có hiệu lực ngay khi được đăng tải công khai trên Ứng dụng. 
              Việc bạn tiếp tục sử dụng Ứng dụng đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. LIÊN HỆ
            </h2>
            <p className="text-gray-600 mb-4">
              Nếu bạn có bất kỳ thắc mắc nào liên quan đến Hỗ trợ tài khoản, Hủy gói cước hoặc Góp ý bài tập, 
              vui lòng liên hệ với bộ phận CSKH của chúng tôi qua:
            </p>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li>Email hỗ trợ: thaingocdg2003@gmail.com</li>
              <li>Hotline: 0909090909</li>
              <li>
                Fanpage chính thức:{" "}
                <a
                  href="https://www.facebook.com/people/EasyStretch/61587162646480/"
                  className="text-green-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.facebook.com/people/EasyStretch/61587162646480/
                </a>
              </li>
            </ul>
          </section>

          <p className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-200">
            Cập nhật lần cuối: Ngày 08 tháng 04 năm 2026
          </p>
        </div>
      </main>
    </div>
  );
}
