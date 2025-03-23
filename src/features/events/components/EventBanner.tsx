"use client";

import Image from "next/image";

interface EventBannerProps {
  title: string;
  summary: string;
  imageUrl?: string;
  categoryName?: string;
}

export function EventBanner({
  title,
  summary,
  imageUrl,
  categoryName,
}: EventBannerProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-base-300 to-base-400 p-10 text-white shadow-xl transition-all hover:shadow-2xl">
      {categoryName && (
        <div className="badge badge-neutral absolute top-6 right-6 backdrop-blur-sm transition-colors">
          {categoryName}
        </div>
      )}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 lg:w-1/2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
            {title || "Sự kiện Trống"}
          </h1>
          <p className="text-lg text-base-content/80">
            {summary || "Không có mô tả"}
          </p>
        </div>
        {imageUrl && (
          <div className="lg:w-1/3">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={300}
              className="h-64 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
