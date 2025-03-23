"use client";

import { useState } from "react";
import { NewsCard } from "./ui/NewsCard";
import { CategoryTabs } from "./ui/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Post } from "@/types/wordpress";

type FeaturedNewsProps = {
  posts: Post[];
};

type CategoryType =
  | "scholarship"
  | "research-news"
  | "achievement"
  | "announcement";

const categories = [
  { slug: "scholarship", name: "Học bổng - Trao đổi" },
  { slug: "research-news", name: "Nghiên cứu" },
  { slug: "achievement", name: "Thành tựu" },
  { slug: "announcement", name: "Thông báo" },
];

export function FeaturedNews({ posts }: FeaturedNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const filteredPosts = !selectedCategory
    ? posts
    : posts.filter((post) =>
        post.categories?.nodes.some((cat) => cat.slug === selectedCategory)
      );

  const heroPost = filteredPosts[0];
  const smallPosts = filteredPosts.slice(1, 5);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-navy-50/10 to-cardinal-50/10" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Decorative elements */}
        <div className="absolute right-10 top-20 h-40 w-40 rounded-full border border-dashed border-navy-200/40" />
        <div className="absolute left-10 bottom-20 h-60 w-60 rounded-full border border-dashed border-cardinal-200/40" />

        {/* Scientific formulas - subtle background text */}
        <div className="absolute top-40 left-20 text-[10px] text-navy-300 rotate-12 select-none backdrop-blur-sm">
          <div className="space-y-1">
            <div>∇ × E = -∂B/∂t</div>
            <div>F = ma</div>
            <div>E = mc²</div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center mb-3 px-4 py-1.5 rounded-full bg-navy-50/50 text-navy-600 text-sm font-medium backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-navy-500 mr-2" />
            Tin tức
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-br from-navy-600 to-cardinal-600 bg-clip-text text-transparent">
            Tin tức mới nhất
          </h2>

          <p className="text-base-content/70 text-lg max-w-2xl leading-relaxed">
            Cập nhật các thông tin mới nhất từ Mạng lưới các CLB sinh viên
            nghiên cứu
          </p>

          <div>
            <CategoryTabs
              categories={categories.filter((cat) => cat.slug !== "All")}
              defaultSelected={null}
              onSelect={(categoryId) =>
                setSelectedCategory(categoryId as CategoryType | null)
              }
              className="mt-8"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Hero Article */}
              {heroPost && (
                <div className="lg:col-span-7">
                  <NewsCard
                    post={{
                      slug: heroPost.slug,
                      title: heroPost.title,
                      summary: heroPost.excerpt || "",
                      publishedAt: heroPost.date,
                      category: heroPost.categories.nodes[0]?.slug || "",
                      categoryName: heroPost.categories.nodes[0]?.name || "",
                      featuredImage: heroPost.featuredImage,
                    }}
                  />
                </div>
              )}

              {/* Small Articles Grid */}
              <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2">
                {smallPosts.map((post, index) => (
                  <div key={post.id}>
                    <NewsCard
                      post={{
                        slug: post.slug,
                        title: post.title,
                        summary: post.excerpt || "",
                        publishedAt: post.date,
                        category: post.categories.nodes[0]?.slug || "",
                        categoryName: post.categories.nodes[0]?.name || "",
                        featuredImage: post.featuredImage,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              key="empty"
              className="text-center py-16 text-base-content/60 bg-white/80 rounded-xl backdrop-blur-md border border-slate-200/60 shadow-sm hover:shadow-md hover:bg-white/90"
            >
              <div className="text-5xl mb-4">📰</div>
              <p className="text-lg font-medium">
                Không tìm thấy bài viết nào trong danh mục này.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Vui lòng thử chọn danh mục khác
              </p>
            </div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cardinal-600 text-white font-medium shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-cardinal-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cardinal-500 focus:ring-offset-2"
            >
              <span className="relative">Xem tất cả tin tức</span>
              <span>
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
