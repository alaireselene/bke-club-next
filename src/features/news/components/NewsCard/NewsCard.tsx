import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatDate, toISOString } from "@/lib/utils/date"; // Assuming these handle ISO strings
import type { News } from "../../types"; // Import the updated News type
import { createExcerpt } from "@/lib/utils/contentModify";

import type { NewsCardProps } from "./types";

export function NewsCard({ news }: { news: News }) { // Use updated News type directly
  const publishDate = news.date_created; // Use date_created
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";

  // Parse categories and get the first one
  let mainCategoryName = "Tin tức"; // Default
  try {
    const parsedCategories = typeof news.categories === 'string'
      ? JSON.parse(news.categories)
      : news.categories;
    if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
      mainCategoryName = parsedCategories[0]; // Take the first category
    }
  } catch (e) {
    console.error("Error parsing categories for news card:", news.id, e);
  }

  const imageUrl = news.preview_image
    ? `${directusUrl}/assets/${news.preview_image}`
    : null; // Handle missing image

  const excerptText = createExcerpt(news.content);

  return (
    <Link href={`/news/${news.id}`}> {/* Link using ID */}
      <article className="group h-full bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden transition hover:shadow-md">
        {imageUrl && ( // Use constructed image URL
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={news.title} // Keep using title for alt text
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-cardinal-50 px-2 py-1 text-xs font-medium text-cardinal-700">
                {mainCategoryName} {/* Use parsed category name */}
              </span>
            </div>

            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
              {news.title}
            </h3>

            {/* Display generated plain text excerpt */}
            <p className="text-sm text-slate-600 line-clamp-2">
              {excerptText}
            </p>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={toISOString(publishDate)}>
                  {formatDate(publishDate)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
