import Image from "next/image";

export const metadata = {
  title: "Cơ cấu tổ chức - Mạng lưới CLB Sinh viên NCKH",
  description:
    "Thông tin về cấu trúc tổ chức và các đơn vị trong Mạng lưới CLB Sinh viên NCKH",
};

export default function StructurePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-cardinal-600">Cơ cấu tổ chức</h1>

      <div className="mt-6">
        <p className="text-gray-600">
          Mạng lưới CLB Sinh viên Nghiên cứu Khoa học hoạt động theo mô hình
          liên kết đa cấp, tạo sự kết nối chặt chẽ giữa các câu lạc bộ thành
          viên và các đơn vị hỗ trợ nghiên cứu, đổi mới sáng tạo.
        </p>
      </div>

      <div className="mt-8">
        <Image
          src="/org-chart.jpg"
          alt="Sơ đồ tổ chức Mạng lưới SVNCKH"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-lg"
          priority
        />
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Trung tâm Sáng tạo và Khởi nghiệp Sinh viên
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Là đơn vị chủ quản, Trung tâm Sáng tạo và Khởi nghiệp Sinh viên giữ
            vai trò định hướng chiến lược và hỗ trợ tổng thể cho mạng lưới CLB
            Sinh viên NCKH.
          </p>
          <p>
            Trung tâm chịu trách nhiệm xây dựng các chương trình hỗ trợ nghiên
            cứu, kết nối nguồn lực, cung cấp tài nguyên, tài chính cũng như cơ
            hội hợp tác với các tổ chức trong và ngoài nước.
          </p>
          <p>
            Trung tâm không chỉ tập trung vào nghiên cứu khoa học, mà còn thúc
            đẩy tư duy đổi mới sáng tạo và tinh thần khởi nghiệp trong sinh
            viên, giúp các nghiên cứu không chỉ dừng lại ở lý thuyết mà có thể
            phát triển thành các dự án thực tế.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Ban Điều hành Mạng lưới CLB Sinh viên NCKH
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Ban Điều hành là đầu mối quản lý và điều phối các hoạt động trong
            mạng lưới CLB Sinh viên NCKH. Đây là bộ phận đảm bảo sự thống nhất
            trong định hướng phát triển, tạo điều kiện thuận lợi cho sinh viên
            tiếp cận các nguồn lực nghiên cứu.
          </p>
          <div className="bg-cardinal-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Danh sách Ban Điều hành
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                PGS.TS. Lương Xuân Điển - Chủ tịch Mạng lưới CLB Sinh viên NCKH
              </li>
              <li>
                TS. Nguyễn Bá Chiến - Phó Chủ tịch Mạng lưới CLB Sinh viên NCKH
              </li>
              <li>
                TS Nguyễn Minh Quân - Phó Chủ tịch Mạng lưới CLB Sinh viên NCKH
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Ban Cố vấn – Đội ngũ chuyên gia hỗ trợ chuyên môn
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Ban Cố vấn là nhóm giảng viên, nhà khoa học và chuyên gia trong các
            lĩnh vực nghiên cứu khác nhau. Họ đóng vai trò quan trọng trong việc
            định hướng và nâng cao chất lượng nghiên cứu của sinh viên.
          </p>
          <p>
            Ban Cố vấn giúp các CLB xây dựng kế hoạch nghiên cứu, đào tạo phương
            pháp nghiên cứu khoa học, tổ chức các buổi hội thảo chuyên đề và hỗ
            trợ sinh viên phát triển kỹ năng viết báo cáo khoa học.
          </p>
        </div>
        <div className="bg-cardinal-50 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
            Danh sách Ban Cố vấn
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              PGS.TS. Nguyễn Bình Minh - Viện trưởng Viện Khoa học và Kinh tế số
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Các Câu lạc bộ Sinh viên Nghiên cứu Khoa học
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Các CLB Sinh viên NCKH là hạt nhân chính của mạng lưới, nơi trực
            tiếp triển khai các hoạt động nghiên cứu, trao đổi học thuật và thực
            hiện các dự án khoa học.
          </p>
          {/* <div className="p-6 mt-4">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Hoạt động chính
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Các hội thảo chuyên đề về nghiên cứu khoa học</li>
              <li>Các khóa đào tạo kỹ năng nghiên cứu</li>
              <li>Chương trình trao đổi giữa các nhóm nghiên cứu</li>
              <li>
                Cuộc thi nghiên cứu khoa học cấp trường, cấp khu vực và quốc gia
              </li>
            </ul>
          </div> */}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Hỗ trợ Tài chính & Đối tác Bên ngoài
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Mạng lưới CLB Sinh viên NCKH kết nối với các doanh nghiệp, tổ chức
            tài trợ và quỹ nghiên cứu nhằm hỗ trợ kinh phí thực hiện dự án, cấp
            học bổng nghiên cứu và cung cấp trang thiết bị phục vụ thí nghiệm.
          </p>
          <p>
            Các đối tác bên ngoài cũng mang đến cơ hội thực tập, làm việc và
            tiếp cận công nghệ mới cho sinh viên. Điều này không chỉ giúp nghiên
            cứu khoa học của sinh viên có tính thực tế cao hơn mà còn tạo điều
            kiện để các bạn phát triển sự nghiệp trong tương lai.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Hệ thống Mentor & Nhóm Nghiên cứu
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Mentor là những chuyên gia, giảng viên và cựu sinh viên có kinh
            nghiệm trong lĩnh vực nghiên cứu khoa học, trực tiếp hướng dẫn các
            nhóm nghiên cứu trong việc xác định hướng đi, triển khai dự án và
            ứng dụng kết quả nghiên cứu vào thực tiễn.
          </p>
          <div className="bg-cardinal-50 rounded-lg p-6 mt-4">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Các nhóm chuyên môn
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phát triển kiến thức chuyên sâu trong từng lĩnh vực</li>
              <li>Tổ chức các buổi đào tạo và chia sẻ chuyên môn</li>
              <li>Triển khai các dự án nghiên cứu ứng dụng</li>
              <li>Hợp tác với doanh nghiệp và tổ chức nghiên cứu</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Tài nguyên hỗ trợ
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Mạng lưới CLB sinh viên NCKH là nơi cung cấp các tài nguyên đa dạng
            hỗ trợ sinh viên trong hành trình khởi nghiệp. Tại đây, sinh viên có
            thể truy cập vào các biểu mẫu cần thiết, các công cụ phần mềm mã
            nguồn mở giúp tối ưu hóa quá trình phát triển ý tưởng NCKH. Mạng
            lưới cung cấp các bài giảng, bài thuyết trình và các quy trình chi
            tiết, giúp sinh viên hiểu rõ hơn về các bước trong quá trình nghiên
            cứu. Để mở rộng khả năng chia sẻ và học hỏi, trung tâm sẽ xây dựng
            một kênh YouTube, nơi các tài liệu và kiến thức bổ ích sẽ được chia
            sẻ đến cộng đồng sinh viên.
          </p>
        </div>
      </section>
    </div>
  );
}
