"use client";

import Image from "next/image";
import type { EventBannerProps } from "./types";

export function EventBanner({
  title,
  summary,
  imageUrl,
  categoryName,
}: EventBannerProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-muted to-background p-6 sm:p-8 text-foreground shadow-lg transition-shadow hover:shadow-xl"> {/* Adjusted rounding, gradient, padding, text color, shadow */}
      {categoryName && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 rounded-full bg-accent/80 text-accent-foreground text-xs sm:text-sm font-medium backdrop-blur-sm transition-colors"> {/* Replaced badge, adjusted position/padding/styles */}
          {categoryName}
        </div>
      )}
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between"> {/* Adjusted gap */}
        <div className="space-y-4 sm:space-y-6 lg:w-1/2 lg:max-w-xl"> {/* Adjusted spacing, added max-width */}
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"> {/* Adjusted text sizes */}
            {title || "Sự kiện Trống"}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground"> {/* Adjusted text size and color */}
            {summary || "Không có mô tả"}
          </p>
        </div>
        {imageUrl && (
          <div className="lg:w-1/3 xl:w-2/5"> {/* Adjusted width constraints */}
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={300}
              className="aspect-[4/3] w-full rounded-md object-cover shadow-md sm:aspect-video lg:aspect-[4/3]" // Use aspect ratio, adjusted rounding/shadow
            />
          </div>
        )}
      </div>
    </div>
  );
}
