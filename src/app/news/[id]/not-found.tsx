import Link from "next/link";
import { PageHeader } from "@/app/components/ui/PageHeader";

export default function PostNotFoundPage() {
  return (
    <main>
      <PageHeader title="Bài viết không tồn tại" />

      <div className="container mx-auto px-4 py-16">
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body text-center">
            <p className="text-base-content/70">
              Không tìm thấy bài viết này. Có thể bài viết đã bị xóa hoặc di
              chuyển sang vị trí khác.
            </p>
            <div className="card-actions justify-center mt-4">
              <Link href="/news" className="btn btn-primary">
                Xem tất cả tin tức
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
