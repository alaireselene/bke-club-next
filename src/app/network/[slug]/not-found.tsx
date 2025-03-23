import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";

export default function ClubNotFound() {
  return (
    <>
      <PageHeader title="Không tìm thấy câu lạc bộ" />

      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <div>
            <p className="font-medium">
              Câu lạc bộ này không tồn tại hoặc đã bị xóa.
            </p>
            <p className="mt-2 text-sm">
              Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang mạng lưới.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/network" className="btn btn-primary">
            Quay lại trang mạng lưới
          </Link>
        </div>
      </div>
    </>
  );
}
