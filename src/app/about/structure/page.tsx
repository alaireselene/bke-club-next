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
          viên và các đơn vị hỗ trợ nghiên cứu, đổi mới sáng tạo. Cơ cấu tổ chức
          của Mạng lưới được thiết kế để đồng hành với định hướng phát triển
          khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia, đảm
          bảo sự phát triển bền vững và hiệu quả.
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
                <span className="font-bold">PGS.TS. Huỳnh Đăng Chính</span> -
                Chủ tịch Mạng lưới CLB Sinh viên NCKH (Phụ trách chung)
              </li>
              <li>
                <span className="font-bold">PGS.TS. Lương Xuân Điển</span> - Phó
                Chủ tịch Thường trực Mạng lưới CLB Sinh viên NCKH (Phụ trách
                Tiểu ban cơ sở vật chất, Tiểu ban học thuật, Tiểu ban hợp tác
                đối ngoại, Tiểu ban truyền thông - sự kiện)
              </li>
              <li>
                <span className="font-bold">TS. Nguyễn Bá Chiến</span> - Phó Chủ
                tịch Mạng lưới CLB Sinh viên NCKH (Phụ trách Tiểu ban hợp tác
                đối ngoại - tài chính)
              </li>
              <li>
                <span className="font-bold">TS. Nguyễn Minh Quân</span> - Phó
                Chủ tịch Mạng lưới CLB Sinh viên NCKH (Phụ trách Tiểu ban truyền
                thông - sự kiện)
              </li>
              <li>
                <span className="font-bold">Giảng viên: </span> (đang cập nhật)
              </li>
              <li>
                <span className="font-bold">Doanh nghiệp: </span> (đang cập
                nhật)
              </li>
              <li>
                <span className="font-bold">Sinh viên: </span>
                <ul>
                  <li>
                    <span className="font-bold">
                      Đại diện các chủ nhiệm CLB
                    </span>{" "}
                    thuộc Mạng lưới
                  </li>
                  <li>
                    <span className="font-bold">
                      Nguyễn Trường Sơn (Khoa Toán - Tin)
                    </span>{" "}
                    - Hỗ trợ quản trị website, phát triển tài nguyên số
                  </li>
                </ul>
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
            Ban Cố vấn bao gồm các học giả uy tín trong và ngoài nước, các nhà
            quản lý cấp cao của các tập đoàn, doanh nghiệp lớn, các cựu sinh
            viên Bách khoa là doanh nhân thành đạt, cùng các chuyên gia hàng đầu
            trong các lĩnh vực nghiên cứu.
          </p>
          <p>
            Với vai trò quan trọng, Ban Cố vấn định hướng chiến lược và góp phần
            nâng cao chất lượng hoạt động nghiên cứu khoa học và đổi mới sáng
            tạo của sinh viên.
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
            Các Câu lạc bộ Sinh viên Nghiên cứu Khoa học đóng vai trò hạt nhân
            trong mạng lưới, trực tiếp triển khai hoặc tham gia các hoạt động
            đào tạo kỹ năng nghiên cứu, công bố ấn phẩm khoa học, trao đổi học
            thuật, giao lưu ý tưởng, đồng thời đề xuất và phát triển các đề tài,
            dự án nghiên cứu khoa học và đổi mới sáng tạo.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Đối tác Bên ngoài
        </h2>
        <div className="mt-4 space-y-6">
          <p>
            Các đối tác bên ngoài có mối quan hệ với mạng lưới các câu lạc bộ
            sinh viên nghiên cứu khoa học bao gồm:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Các đối tác trong nước
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Các trường Đại học, Viện nghiên cứu</li>
                <li>Các tổ chức khoa học, công nghệ và giáo dục</li>
                <li>Các quỹ tài trợ, tổ chức hỗ trợ nghiên cứu khoa học</li>
              </ul>
            </div>
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Các đối tác nước ngoài
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Các trường Đại học, Viện nghiên cứu quốc tế</li>
                <li>Các tổ chức khoa học, công nghệ và giáo dục toàn cầu</li>
                <li>
                  Các tổ chức phi chính phủ hỗ trợ nghiên cứu khoa học và đổi
                  mới sáng tạo
                </li>
              </ul>
            </div>
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Doanh nghiệp & Khởi nghiệp
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Các tập đoàn lớn có hoạt động nghiên cứu và phát triển (R&D)
                </li>
                <li>
                  Các doanh nghiệp khoa học công nghệ, công ty khởi nghiệp đổi
                  mới sáng tạo
                </li>
                <li>
                  Các quỹ đầu tư hỗ trợ khởi nghiệp và thương mại hóa kết quả
                  nghiên cứu khoa học
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Hỗ trợ tài chính
        </h2>
        <div className="mt-4 space-y-6">
          <div className="bg-cardinal-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Các khoản tài trợ
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold">
                  Từ trường Đại học, viện nghiên cứu:
                </span>
                <p className="mt-1">
                  Hỗ trợ kinh phí cho các đề tài/dự án nghiên cứu khoa học và
                  đổi mới sáng tạo của sinh viên.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Từ doanh nghiệp, tập đoàn:
                </span>
                <p className="mt-1">
                  Hỗ trợ tài chính cho các đề tài/dự án nghiên cứu có tiềm năng
                  ứng dụng thực tế, các cuộc thi nghiên cứu khoa học.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Từ các tổ chức khoa học, công nghệ, giáo dục:
                </span>
                <p className="mt-1">
                  Hỗ trợ dưới dạng học bổng, kinh phí tổ chức hội thảo, diễn đàn
                  nghiên cứu khoa học.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-cardinal-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Các quỹ nghiên cứu
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold">Quỹ từ Nhà nước:</span>
                <p className="mt-1">
                  Quỹ Phát triển Khoa học và Công nghệ Quốc gia (NAFOSTED), quỹ
                  hỗ trợ nghiên cứu sinh viên của Bộ GD&ĐT.
                </p>
              </li>
              <li>
                <span className="font-semibold">Quỹ từ tổ chức quốc tế:</span>
                <p className="mt-1">
                  Các quỹ học thuật, quỹ đổi mới sáng tạo từ các tổ chức nước
                  ngoài hoặc liên chính phủ.
                </p>
              </li>
              <li>
                <span className="font-semibold">Quỹ từ doanh nghiệp:</span>
                <p className="mt-1">
                  Quỹ hỗ trợ nghiên cứu phát triển sản phẩm, thương mại hóa công
                  nghệ.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Quỹ từ ĐHBK và cựu sinh viên:
                </span>
                <p className="mt-1">
                  Quỹ nghiên cứu từ Đại học Bách khoa Hà Nội, cựu sinh viên và
                  các tổ chức, cá nhân trong nước.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">Mentors</h2>
        <div className="mt-4 space-y-4">
          <p>
            Mentors là những chuyên gia, giảng viên và cựu sinh viên có giàu
            kinh nghiệm trong lĩnh vực nghiên cứu khoa học và đổi mới sáng tạo,
            trực tiếp hướng dẫn, tư vấn và đào tạo các câu lạc bộ sinh viên
            nghiên cứu khoa trong các hoạt động nghiên cứu khoa học như đào tạo
            kỹ năng nghiên cứu khoa học, chia sẻ chuyên môn, sự kiện học thuật,
            việc xác định hướng đi, triển khai các đề tài/dự án nghiên cứu và
            ứng dụng kết quả nghiên cứu vào thực tiễn, trao đổi sinh viên và kết
            nối doanh nghiệp, tham gia các cuộc thi nghiên cứu khoa học và đổi
            mới sáng tạo.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Nhóm chuyên môn
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Nhóm chuyên môn là tập hợp các giảng viên, nhà nghiên cứu có cùng
            chuyên môn trong một lĩnh vực nhất định, trực thuộc các khoa của các
            trường thuộc Đại học Bách khoa Hà Nội.
          </p>
          <div className="bg-cardinal-50 rounded-lg p-6 mt-4">
            <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
              Nhiệm vụ chính
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Giảng dạy và phát triển chương trình đào tạo</li>
              <li>Nghiên cứu khoa học và triển khai công nghệ</li>
              <li>Hợp tác với doanh nghiệp, tổ chức nghiên cứu</li>
              <li>Hướng dẫn sinh viên, học viên cao học, nghiên cứu sinh</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Nhóm nghiên cứu
        </h2>
        <div className="mt-4 space-y-4">
          <p>
            Nhóm nghiên cứu tại Đại học Bách khoa Hà Nội là tập hợp các giảng
            viên, nhà nghiên cứu, và sinh viên có cùng định hướng khoa học và
            công nghệ, hoạt động nhằm giải quyết các vấn đề nghiên cứu chuyên
            sâu, phát triển công nghệ, ứng dụng thực tiễn và hợp tác trong nước,
            quốc tế.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Chương trình đào tạo
        </h2>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Phương pháp nghiên cứu khoa học
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hướng dẫn sinh viên về quy trình nghiên cứu</li>
                <li>Kỹ năng tìm kiếm và tổng hợp tài liệu khoa học</li>
                <li>
                  Phương pháp thiết kế thí nghiệm, thu thập và xử lý dữ liệu
                </li>
                <li>Cách viết báo cáo khoa học, bài báo quốc tế</li>
              </ul>
            </div>
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Kỹ năng mềm cho nghiên cứu khoa học
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kỹ năng trình bày và bảo vệ đề tài nghiên cứu khoa học</li>
                <li>Làm việc nhóm trong nghiên cứu khoa học</li>
                <li>Kỹ năng tư duy phản biện và sáng tạo</li>
              </ul>
            </div>
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Đổi mới sáng tạo khoa học công nghệ
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Phát triển ý tưởng từ nghiên cứu khoa học đến ứng dụng thực tế
                </li>
                <li>Bảo hộ sở hữu trí tuệ và thương mại hóa công nghệ</li>
                <li>Kết nối với doanh nghiệp và vườn ươm khởi nghiệp</li>
              </ul>
            </div>
            <div className="bg-cardinal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cardinal-700 mb-4">
                Hội thảo và hội nghị khoa học
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hội nghị khoa học sinh viên các cấp</li>
                <li>Diễn đàn giao lưu với các nhà khoa học, chuyên gia</li>
                <li>Chuỗi seminar nghiên cứu chuyên sâu</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
