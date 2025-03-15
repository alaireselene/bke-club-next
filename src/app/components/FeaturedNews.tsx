"use client";

import { useState } from "react";
import { NewsCard } from "./ui/NewsCard";
import { CategoryTabs } from "./ui/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types/wordpress";

type FeaturedNewsProps = {
  posts: Post[];
};

type CategoryType =
  | "All"
  | "scholarship"
  | "research-news"
  | "achievement"
  | "announcement";

const categories = [
  { slug: "All", name: "Tất cả" },
  { slug: "scholarship", name: "Học bổng - Trao đổi" },
  { slug: "research-news", name: "Nghiên cứu" },
  { slug: "achievement", name: "Thành tựu" },
  { slug: "announcement", name: "Thông báo" },
];

export function FeaturedNews({ posts }: FeaturedNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.categories?.nodes.some((cat) => cat.slug === selectedCategory)
        );

  const heroPost = filteredPosts[0];
  const smallPosts = filteredPosts.slice(1, 5);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,51,102,0.03)_0%,transparent_60%)]"></div>

        {/* Decorative elements */}
        <div className="absolute right-10 top-20 h-40 w-40 rounded-full border border-dashed border-navy-200/40 opacity-60"></div>
        <div className="absolute left-10 bottom-20 h-60 w-60 rounded-full border border-dashed border-cardinal-200/40 opacity-60"></div>

        {/* Scientific formulas - subtle background text */}
        <div className="absolute top-40 left-20 font-serif text-[10px] text-navy-300/20 rotate-12 select-none">
          ∇ × E = -∂B/∂t
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-navy-50 text-navy-600 text-sm font-medium">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-navy-500 mr-2"></span>
            Tin tức
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-navy-700 to-navy-500 bg-clip-text text-transparent">
            Tin tức mới nhất
          </h2>

          <p className="text-base-content/70 text-lg max-w-2xl">
            Cập nhật các thông tin mới nhất từ Mạng lưới các CLB sinh viên
            nghiên cứu
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
              <div className="lg:col-span-7 animate-fade-in">
                <NewsCard
                  post={{
                    slug: heroPost.slug,
                    title: heroPost.title,
                    summary: heroPost.excerpt || "",
                    publishedAt: heroPost.date,
                    category: heroPost.categories.nodes[0]?.slug || "",
                    categoryName: heroPost.categories.nodes[0]?.name || "",
                    featuredImage: heroPost.featuredImage,
                    author: heroPost.author?.node.name,
                  }}
                />
              </div>
            )}

            {/* Small Articles Grid */}
            <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2">
              {smallPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <NewsCard
                    post={{
                      slug: post.slug,
                      title: post.title,
                      summary: post.excerpt || "",
                      publishedAt: post.date,
                      category: post.categories.nodes[0]?.slug || "",
                      categoryName: post.categories.nodes[0]?.name || "",
                      featuredImage: post.featuredImage,
                      author: post.author?.node.name,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">📰</div>
            <p>Không tìm thấy bài viết nào trong danh mục này.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-navy-600 to-navy-500 text-white font-semibold transition-all duration-300 hover:shadow-lg relative overflow-hidden"
          >
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-navy-600 to-navy-500"></span>
            <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
            <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>
            <span className="relative">Xem tất cả tin tức</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
