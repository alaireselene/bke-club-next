"use client";

import { useState } from "react";
import { NewsCard } from "@/features/news";
import { CategoryTabs } from "@/components/shared/CategoryTabs/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// Removed: import { motion } from "motion/react";
import { Button } from "@/components/ui/button"; // Import Button
import type { FeaturedNewsProps, CategoryType } from "./types";
import { News } from "../../types";
import { newsCategories, getCategorySlug } from "../../utils/categoryUtils"; // Import shared categories and helper

export function LatestNews({ news }: FeaturedNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const filteredNews = !selectedCategory
    ? news
    : news.filter((article: News) => {
        // Assuming Directus returns categories as an array of strings/objects
        // Adjust this logic based on the actual structure of article.categories
        if (!article.categories) return false;
        try {
          const parsedCategories = typeof article.categories === 'string'
            ? JSON.parse(article.categories)
            : article.categories; // Assume it might already be parsed

          // Check if any of the news item's categories (parsed as names) map to the selected slug
          return Array.isArray(parsedCategories) && parsedCategories.some(catName => getCategorySlug(catName) === selectedCategory);
        } catch (e) {
          console.error("Error parsing categories for news:", article.id, e);
          return false;
        }
      });


  return (
    <section className="relative py-12 sm:py-16 overflow-hidden"> {/* Adjusted padding */}
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10 opacity-70"> {/* Added opacity */}
        <div
          className="absolute inset-0 animate-fade-in bg-gradient-to-br from-white via-secondary/5 to-primary/5" // Use theme colors
          style={{ animationDuration: '1s' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 animate-fade-in scale-95 opacity-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" // Use theme border color equivalent
          style={{ animationDuration: '1.2s', animationFillMode: 'forwards', transformOrigin: 'center' }}
        />

        {/* Decorative elements - Simplified animation */}
        <div
          className="absolute right-10 top-20 h-40 w-40 rounded-full border border-dashed border-secondary/20 animate-spin" // Use theme color, basic spin
          style={{ animationDuration: '20s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
        />
        <div
          className="absolute left-10 bottom-20 h-60 w-60 rounded-full border border-dashed border-primary/20 animate-spin" // Use theme color, basic spin
          style={{ animationDuration: '25s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', animationDirection: 'reverse' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-12 sm:mb-16 flex flex-col items-center text-center animate-fade-in opacity-0" // Adjusted margin
          style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}
        >
          <div
            className="inline-flex items-center justify-center mb-4 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-medium transition-transform hover:scale-105" // Use theme color (secondary for news)
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-secondary mr-2 animate-pulse" // Use theme color, basic pulse
              style={{ animationDuration: '2s' }}
            />
            Tin tức
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent animate-fade-in opacity-0" // Adjusted size & color
            style={{ animationDuration: '0.6s', animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Tin tức mới nhất
          </h2>

          <p
            className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed animate-fade-in opacity-0" // Use theme color, adjusted size
            style={{ animationDuration: '0.6s', animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Cập nhật các thông tin mới nhất từ Mạng lưới các CLB sinh viên
            nghiên cứu
          </p>

          <div
            className="animate-fade-in opacity-0"
            style={{ animationDuration: '0.6s', animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <CategoryTabs
              categories={newsCategories.filter((cat) => cat.slug !== "All")} // Use imported categories
              defaultSelected={null}
              onSelect={(categoryId) =>
                setSelectedCategory(categoryId as CategoryType | null)
              }
              className="mt-6 sm:mt-8" // Adjusted margin
            />
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((article) => (
              <div key={article.id}>
                <NewsCard news={article} />
              </div>
            ))}
          </div>
        ) : (
          <div
            key="empty"
            className="text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border animate-fade-in opacity-0" // Use theme colors/border
            style={{ animationDuration: '0.4s', animationFillMode: 'forwards' }}
          >
            <div
              className="text-4xl sm:text-5xl mb-4 animate-pulse" // Basic pulse
              style={{ animationDuration: '2s' }}
            >
              📰
            </div>
            <p className="text-base sm:text-lg font-medium"> {/* Adjusted size */}
              Không tìm thấy bài viết nào trong danh mục này.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Vui lòng thử chọn danh mục khác
            </p>
          </div>
        )}

        <div
          className="mt-12 sm:mt-16 text-center animate-fade-in opacity-0" // Adjusted margin
          style={{ animationDuration: '0.6s', animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          {/* Replaced custom Link with standard Button */}
          <Link href="/news" passHref>
            <Button size="lg" variant="default" asChild className="transition-transform hover:scale-105">
              <span>
                Xem tất cả tin tức
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
