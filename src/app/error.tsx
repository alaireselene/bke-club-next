"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-bold">Đã có lỗi xảy ra</h2>
      <p className="text-base-content/70 max-w-md">
        Xin lỗi, đã có lỗi xảy ra khi tải trang. Vui lòng thử lại sau.
      </p>
      <div className="flex gap-4 mt-4">
        <button onClick={reset} className="btn btn-primary">
          Thử lại
        </button>
        <Link href="/" className="btn">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
