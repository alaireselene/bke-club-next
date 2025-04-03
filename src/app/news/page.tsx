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

async function getNewsData(limit = 10) { // Add limit for initial fetch
  // Fetch initial posts using Directus SDK
  const postsData = await directus.request(readItems('post', {
    fields: ['*', 'categories'], // Ensure categories field is fetched
    sort: ['-date_created'], // Sort by creation date descending
    limit: limit,
  }));

  const news = postsData as Post[];

  // Extract unique categories from the fetched posts
  // Assuming 'categories' is a JSON array of strings in Directus
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
  const uniqueCategories = [...new Set(allCategories)].map(cat => ({ name: cat, slug: cat })); // Create simple category objects

  // Determine if there are more posts
  // We need the total count for accurate pagination, fetch it separately
  // For infinite scroll, we can just check if the number fetched equals the limit
  const hasMore = news.length === limit;
  // Directus doesn't use cursors like GraphQL connections. Offset/page is used.
  // We'll pass the next offset/page number or rely on NewsFilter to manage it.
  // Let's pass a simple hasMore flag for now.

  return {
    news: news,
    // Pass a simplified pagination indicator
    pageInfo: { hasNextPage: hasMore, endCursor: null }, // Adapt based on NewsFilter needs
    categories: uniqueCategories, // Pass extracted categories
  };
}

export default async function NewsPage() {
  const { news, pageInfo, categories } = await getNewsData();

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
              hasMore={pageInfo.hasNextPage}
              endCursor={null}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
