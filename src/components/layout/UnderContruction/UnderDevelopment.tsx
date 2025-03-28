"use client";

import { Construction } from "lucide-react";
import { useEffect, useState } from "react";

export default function UnderDevelopment() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 space-y-6">
      <div className="relative">
        <Construction
          className="w-24 h-24 text-primary animate-bounce"
          strokeWidth={1.5}
        />
        <div className="absolute -top-2 -right-2">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
          </span>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
        Chức năng đang phát triển
      </h1>

      <p className="text-lg text-center text-base-content/70 max-w-md">
        Chúng tôi đang làm việc chăm chỉ để mang đến cho bạn những tính năng tốt
        nhất. Vui lòng quay lại sau!
      </p>

      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
