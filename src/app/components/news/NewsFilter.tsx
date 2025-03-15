"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "@/app/components/ui/CategoryTabs";
import { NewsCard } from "@/app/components/ui/NewsCard";
import type { Post } from "@/types/wordpress";

interface Category {
  slug: string;
  name: string;
}

interface NewsFilterProps {
  categories: Category[];
  posts: Post[];
}

export function NewsFilter({ categories, posts }: NewsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;

    return posts.filter((post) =>
      post.categories.nodes.some((cat) => cat.slug === selectedCategory)
    );
  }, [posts, selectedCategory]);

  return (
    <>
      <CategoryTabs
        categories={categories}
        onSelect={setSelectedCategory}
        className="mb-8"
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <NewsCard
            key={post.databaseId}
            post={{
              slug: post.slug,
              title: post.title,
              summary: post.excerpt || "",
              featuredImage: post.featuredImage,
              publishedAt: post.date,
              category: post.categories.nodes[0]?.slug || "news",
              categoryName: post.categories.nodes[0]?.name || "Tin tức",
              author: post.author?.node.name,
            }}
          />
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">📰</div>
            <p>Không có bài viết nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </>
  );
}
