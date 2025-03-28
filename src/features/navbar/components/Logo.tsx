"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <Image
        src="/hust-logo.png"
        alt="HUST Logo"
        width={64}
        height={64}
        className="h-16 w-auto"
      />
      <Image
        src="/logo.svg"
        alt="HUST Research Clubs Network Logo"
        width={64}
        height={64}
        className="h-16 w-auto"
      />
      <div className="hidden sm:block">
        <p className="text-chalk-100 font-sans text-sm font-medium">
          Trung tâm Sáng tạo và Khởi nghiệp Sinh viên
        </p>
        <p className="text-chalk-100 font-sans text-lg font-bold uppercase">
          Mạng lưới CLB sinh viên nghiên cứu khoa học
        </p>
      </div>
    </Link>
  );
}
