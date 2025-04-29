/**
 * NewsCard - Responsive, industry-grade card for news articles.
 *
 * Usage:
 * <NewsCard news={newsItem} />
 *
 * - Uses Card primitive for layout and spacing
 * - Consistent badge style for category
 * - Responsive image with aspect ratio
 * - Responsive typography and spacing
 * - Utility-first, no inline layout styles
 * - Accessible and keyboard-navigable
 */
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, toISOString } from "@/lib/utils/date";
import type { News } from "../../types";
import { createExcerpt } from "@/lib/utils/contentModify";
import { getCategoryDisplayName } from "../../utils/categoryUtils";

export function NewsCard({ news }: { news: News }) {
  const publishDate = news.date_created;
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";

  // Parse categories and get the first one
  let mainCategoryName = "Tin tức";
  try {
    const parsedCategories = typeof news.categories === "string"
      ? JSON.parse(news.categories)
      : news.categories;
    if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
      mainCategoryName = parsedCategories[0];
    }
  } catch (e) {
    console.error("Error parsing categories for news card:", news.id, e);
  }

  const imageUrl = news.preview_image
    ? `${directusUrl}/assets/${news.preview_image}`
    : null;

  const excerptText = createExcerpt(news.content);

  return (
    <Link href={`/news/${news.id}`} tabIndex={0} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg">
      <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card">
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
            <Image
              src={imageUrl}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
        <CardContent className="flex flex-col flex-grow gap-4 p-6 sm:p-8">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            {getCategoryDisplayName(mainCategoryName)}
          </span>
          <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
            {excerptText}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={toISOString(publishDate)}>{formatDate(publishDate)}</time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
