import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS, GET_CATEGORIES } from "@/lib/graphql/queries";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { NewsFilter } from "@/features/news/components/NewsFilter";
import type { Post } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Tin tức | HUST Research Clubs Network",
  description: "Tin tức và thông báo mới nhất từ Mạng lưới",
};

export const revalidate = 3600; // Revalidate every hour

interface CategoryNode {
  slug: string;
  name: string;
  ancestors?: {
    nodes: {
      slug: string;
    }[];
  };
}

interface NewsData {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
  categories: {
    nodes: CategoryNode[];
  };
}

async function getNewsData() {
  const { data } = await getClient().query<NewsData>({
    query: GET_POSTS,
    variables: {
      first: 12,
      after: null,
    },
  });

  const { data: categoryData } = await getClient().query<NewsData>({
    query: GET_CATEGORIES,
  });

  // Filter categories:
  // 1. Exclude event category and its subcategories
  // 2. Exclude root news category
  // 3. Only include subcategories of news
  const categories = categoryData.categories.nodes.filter((category) => {
    // Skip event category and its subcategories
    if (category.slug === "event") return false;
    const ancestors = category.ancestors?.nodes || [];
    if (ancestors.some((ancestor) => ancestor.slug === "event")) return false;

    // Only include categories that are subcategories of "news"
    return ancestors.some((ancestor) => ancestor.slug === "news");
  });

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
    categories,
  };
}

export default async function NewsPage() {
  const { posts, pageInfo, categories } = await getNewsData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#CE1628] opacity-5 -rotate-1" />
          <PageHeader
            title="Tin tức"
            description="Tin tức và thông báo mới nhất từ Mạng lưới"
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        {/* News Content */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-16 -bottom-16 bg-base-200/20 -skew-y-3" />
          <div className="relative">
            <NewsFilter
              categories={categories}
              posts={posts}
              hasMore={pageInfo.hasNextPage}
              endCursor={pageInfo.endCursor}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
