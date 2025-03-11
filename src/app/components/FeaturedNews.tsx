"use client";

import { useState } from "react";
import { Post } from "@/db/schema";
import { NewsCard } from "./ui/NewsCard";
import { CategoryTabs } from "./ui/CategoryTabs";

type FeaturedNewsProps = {
  posts: Post[];
};

type CategoryType = "All" | Post["category"];

const categories: { id: string; name: string }[] = [
  { id: "All", name: "Tất cả" },
  { id: "news", name: "Tin tức" },
  { id: "announcement", name: "Thông báo" },
  { id: "research", name: "Nghiên cứu" },
  { id: "achievement", name: "Thành tựu" },
];

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

          <CategoryTabs
            categories={categories}
            defaultSelected="All"
            onSelect={(categoryId) =>
              setSelectedCategory(categoryId as CategoryType)
            }
            className="mt-8"
          />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Hero Article */}
            {heroPost && (
              <div className="lg:col-span-7">
                <NewsCard
                  key={heroPost.id}
                  slug={`${heroPost.id}`}
                  title={heroPost.title}
                  summary={heroPost.summary || ""}
                  category={heroPost.category}
                  categoryName={
                    categories.find((c) => c.id === heroPost.category)?.name ||
                    heroPost.category
                  }
                  publishedAt={heroPost.createdAt.toISOString()}
                  image={heroPost.featuredImageUrl || undefined}
                />
              </div>
            )}

            {/* Small Articles Grid */}
            <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2">
              {smallPosts.map((post) => (
                <NewsCard
                  key={post.id}
                  slug={`${post.id}`}
                  title={post.title}
                  summary={post.summary || ""}
                  category={post.category}
                  categoryName={
                    categories.find((c) => c.id === post.category)?.name ||
                    post.category
                  }
                  publishedAt={post.createdAt.toISOString()}
                  image={post.featuredImageUrl || undefined}
                />
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
