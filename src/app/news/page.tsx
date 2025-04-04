import { Metadata } from "next";
import { directus, Post } from "@/lib/directus"; // Import directus client and Post type
import { readItems } from "@directus/sdk"; // Import readItems function
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { NewsFilter } from "@/features/news/components/NewsFilter";
// News type will be updated later in src/features/news/types.ts

export const metadata: Metadata = {
  title: "Tin tức | HUST Research Clubs Network",
  description: "Tin tức và thông báo mới nhất từ Mạng lưới",
};

export const revalidate = 3600; // Revalidate every hour

// Remove GraphQL specific interfaces

async function getNewsData() {
  // Fetch all posts using Directus SDK
  const postsData = await directus.request(readItems('post', {
    fields: ['*', 'categories'],
    sort: ['-date_created'],
  }));

  const news = postsData as Post[];

  // Extract unique categories from the fetched posts
  const allCategories = news.flatMap(post => {
    try {
      // Ensure categories is parsed if it's a stringified JSON
      const parsedCategories = typeof post.categories === 'string' ? JSON.parse(post.categories) : post.categories;
      return Array.isArray(parsedCategories) ? parsedCategories : [];
    } catch (e) {
      console.error("Error parsing categories for post:", post.id, e);
      return [];
    }
  });
  const uniqueCategories = [...new Set(allCategories)].map(cat => ({ name: cat, slug: cat }));

  return {
    news: news,
    categories: uniqueCategories,
  };
}

export default async function NewsPage() {
  const { news, categories } = await getNewsData();

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
              news={news}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

