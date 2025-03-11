"use client";

import { useState } from "react";
import { CategoryTabs } from "@/app/components/ui/CategoryTabs";
import { NewsCard } from "@/app/components/ui/NewsCard";

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: number;
  title: string;
  summary: string | null;
  category: "news" | "announcement" | "research" | "achievement";
  createdAt: Date;
  featuredImageUrl: string | null;
  author: {
    fullName: string;
  } | null;
}

interface NewsFilterProps {
  categories: Category[];
  posts: Post[];
}

export function NewsFilter({
  categories,
  posts: initialPosts,
}: NewsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts =
    selectedCategory === null
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

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
    </>
  );
}
