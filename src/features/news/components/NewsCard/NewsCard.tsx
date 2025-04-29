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
import { Calendar, Star } from "lucide-react";
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

  // If preview_image exists, use it as background with dark overlay
  const cardStyle = imageUrl
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  const hasBgImage = !!imageUrl;

  return (
    <Link href={`/news/${news.id}`} tabIndex={0} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg">
      <Card
        style={cardStyle}
        className={`group relative h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg ${imageUrl ? '' : 'bg-card'} bg-cover bg-center ${hasBgImage ? 'text-white' : ''}`}
      >
        {news.featured && (
          <Star className="absolute top-2 right-2 h-5 w-5 text-yellow-400" />
        )}
        <CardContent className="flex flex-col flex-grow gap-4 p-6 sm:p-8">
          <span className={`inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold ${hasBgImage ? 'text-white' : 'text-primary'} mb-2`}>
            {getCategoryDisplayName(mainCategoryName)}
          </span>
          <h3 className={`text-lg sm:text-xl font-bold leading-tight line-clamp-2 transition-colors ${hasBgImage ? 'text-white group-hover:text-white' : 'text-black group-hover:text-primary'}`}>
            {news.title}
          </h3>
          <p className={`text-sm sm:text-base line-clamp-2 ${hasBgImage ? 'text-white' : 'text-muted-foreground'}`}>
            {excerptText}
          </p>
          <div className={`flex items-center gap-2 text-xs mt-auto pt-2 ${hasBgImage ? 'text-white' : 'text-muted-foreground'}`}>
            <Calendar className="h-4 w-4" />
            <time dateTime={toISOString(publishDate)}>{formatDate(publishDate)}</time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
