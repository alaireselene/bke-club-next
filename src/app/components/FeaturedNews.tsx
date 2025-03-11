"use client";

import { useState } from "react";
import { Post } from "@/db/schema";
import { NewsCard } from "./ui/NewsCard";
import { CategoryTabs } from "./ui/CategoryTabs";

type FeaturedNewsProps = {
  posts: Post[];
};

type CategoryType = "All" | Post["category"];

const categories: CategoryType[] = [
  "All",
  "news",
  "announcement",
  "research",
  "achievement",
];

const categoryLabels: Record<CategoryType, string> = {
  All: "Tất cả",
  news: "Tin tức",
  announcement: "Thông báo",
  research: "Nghiên cứu",
  achievement: "Thành tựu",
};

export function FeaturedNews({ posts }: FeaturedNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const heroPost = filteredPosts[0];
  const smallPosts = filteredPosts.slice(1, 5);

  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Tin tức</h2>
          <p className="text-base-content/70 text-lg">
            Các thông tin mới nhất từ Mạng lưới
          </p>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            labels={categoryLabels}
            selected={selectedCategory}
            onChange={setSelectedCategory}
            className="mt-8"
          />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Hero Article */}
            {heroPost && (
              <div className="lg:col-span-7">
                <NewsCard post={heroPost} isHero />
              </div>
            )}

            {/* Small Articles Grid */}
            <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2">
              {smallPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-base-content/60">
            Không tìm thấy bài viết nào trong danh mục này.
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="/news" className="btn btn-primary btn-lg">
            Xem tất cả tin tức
          </a>
        </div>
      </div>
    </section>
  );
}
