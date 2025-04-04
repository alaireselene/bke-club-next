"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { NewsCard } from "@/features/news/components/NewsCard";
import type { News } from "../../types";
import type { NewsFilterProps } from "./types";

export function NewsFilter({
  categories,
  news: initialNews,
}: NewsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [news] = useState<Array<News>>(initialNews);

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


  return (
    <div className="space-y-8">
      <CategoryTabs
        categories={categories}
        onSelect={setSelectedCategory}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" // Use theme background
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}

        {filteredNews.length === 0 && (
          <div className="col-span-full text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border"> {/* Use theme colors/border, adjusted padding */}
            <div className="text-4xl sm:text-5xl mb-4">📰</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Không có bài viết nào trong danh mục này.</p> {/* Adjusted size */}
          </div>
        )}
      </div>
    </div>
  );
}
