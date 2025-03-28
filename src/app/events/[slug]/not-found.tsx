import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";

export default function EventNotFoundPage() {
  return (
    <main>
      <PageHeader title="Sự kiện không tồn tại" />

      <div className="container mx-auto px-4 py-16">
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body text-center">
            <p className="text-base-content/70">
              Không tìm thấy sự kiện này. Có thể sự kiện đã bị xóa hoặc di
              chuyển sang vị trí khác.
            </p>
            <div className="card-actions justify-center mt-4">
              <Link href="/events" className="btn btn-primary">
                Xem tất cả sự kiện
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
