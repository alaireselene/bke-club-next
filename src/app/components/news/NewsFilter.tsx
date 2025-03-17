"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "@/app/components/ui/CategoryTabs";
import { NewsCard } from "@/app/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loadMorePosts } from "@/app/news/actions";
import type { Post } from "@/types/wordpress";

interface Category {
  slug: string;
  name: string;
}

interface NewsFilterProps {
  categories: Category[];
  posts: Post[];
  hasMore: boolean;
  endCursor: string;
}

export function NewsFilter({
  categories,
  posts: initialPosts,
  hasMore: initialHasMore,
  endCursor: initialCursor,
}: NewsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [endCursor, setEndCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;

    return posts.filter((post) =>
      post.categories.nodes.some((cat) => cat.slug === selectedCategory)
    );
  }, [posts, selectedCategory]);

  const handleLoadMore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = await loadMorePosts(endCursor);
      setPosts([...posts, ...data.posts]);
      setHasMore(data.pageInfo.hasNextPage);
      setEndCursor(data.pageInfo.endCursor);
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
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <div
            key={post.databaseId}
            className="group transform transition-all duration-300 hover:scale-[1.02]"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
            }}
          >
            <NewsCard
              post={{
                slug: post.slug,
                title: post.title,
                summary: post.excerpt || "",
                featuredImage: post.featuredImage,
                publishedAt: post.date,
                category: post.categories.nodes[0]?.slug || "news",
                categoryName: post.categories.nodes[0]?.name || "Tin tức",
              }}
            />
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">📰</div>
            <p>Không có bài viết nào trong danh mục này.</p>
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
            className="bg-white/50 hover:bg-white/80 min-w-[200px]"
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

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
