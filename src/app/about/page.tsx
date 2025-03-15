export const metadata = {
  title: "Giới thiệu - Mạng lưới CLB Sinh viên NCKH",
  description:
    "Tổng quan về Mạng lưới CLB Sinh viên NCKH - Đại học Bách khoa Hà Nội",
};

export default function AboutPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-cardinal-600">Giới thiệu</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold text-cardinal-700 mb-4">
            Tổng quan
          </h2>
          <p className="text-gray-600">
            Thông tin tổng quan về lịch sử, sứ mệnh, tầm nhìn và các hoạt động
            chính của mạng lưới.
          </p>
          <a
            href="/about/overview"
            className="mt-4 inline-flex items-center text-cardinal-600 hover:text-cardinal-700"
          >
            Xem chi tiết
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold text-cardinal-700 mb-4">
            Cơ cấu tổ chức
          </h2>
          <p className="text-gray-600">
            Thông tin về cấu trúc tổ chức, ban điều hành, và các đơn vị thành
            viên trong mạng lưới.
          </p>
          <a
            href="/about/structure"
            className="mt-4 inline-flex items-center text-cardinal-600 hover:text-cardinal-700"
          >
            Xem chi tiết
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
