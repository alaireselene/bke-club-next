"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { NewsCard } from "@/features/news/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loadMorePosts } from "@/app/news/actions";
import type { News } from "../../types";
import type { NewsFilterProps } from "./types";

export function NewsFilter({
  categories,
  news: initialNews,
  hasMore: initialHasMore,
}: NewsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [news, setNews] = useState<Array<News>>(initialNews);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const filteredNews = useMemo(() => {
    if (!selectedCategory) return news;

    return news.filter((article) => {
      try {
        // Parse the JSON string from Directus 'categories' field
        const parsedCategories = typeof article.categories === 'string'
          ? JSON.parse(article.categories)
          : article.categories; // Assume it might already be parsed if fetched differently later

        // Check if the resulting array includes the selected category
        return Array.isArray(parsedCategories) && parsedCategories.includes(selectedCategory);
      } catch (e) {
        console.error("Error parsing categories for article:", article.id, e);
        return false; // Exclude if categories JSON is invalid
      }
    });
  }, [news, selectedCategory]);

  const handleLoadMore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // Calculate the offset based on the number of currently loaded posts
      const currentOffset = news.length;
      const data = await loadMorePosts(currentOffset);
      setNews([...news, ...data.posts]);
      setHasMore(data.pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <CategoryTabs
        categories={categories}
        onSelect={setSelectedCategory}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" // Use theme background
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((article, index) => (
          <NewsCard key={article.id} news={article} />
        ))}

        {filteredNews.length === 0 && (
          <div className="col-span-full text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border"> {/* Use theme colors/border, adjusted padding */}
            <div className="text-4xl sm:text-5xl mb-4">📰</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Không có bài viết nào trong danh mục này.</p> {/* Adjusted size */}
          </div>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="min-w-[200px]" // Removed custom background styles
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải...
              </>
            ) : (
              "Xem thêm tin tức"
            )}
          </Button>
        </div>
      )}

      {/* Removed inline style block */}
    </div>
  );
}
