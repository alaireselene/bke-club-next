import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
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
      <Card className="group h-full overflow-hidden flex flex-col"> {/* Replace article with Card, ensure flex column */}
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
        <CardContent className="p-6 flex-grow space-y-4"> {/* Wrap content, add flex-grow */}
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"> {/* Use theme colors */}
                {mainCategoryName} {/* Use parsed category name */}
              </span>
            </div>

            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors"> {/* Use theme hover color */}
              {news.title}
            </h3>

            {/* Display generated plain text excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2"> {/* Use theme text color */}
              {excerptText}
            </p>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2"> {/* Use theme text color, added padding top */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={toISOString(publishDate)}>
                  {formatDate(publishDate)}
                </time>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
