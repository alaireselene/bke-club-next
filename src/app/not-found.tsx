import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-4">Không tìm thấy trang</h3>
      <p className="text-base-content/70 max-w-md mb-8">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link href="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}
