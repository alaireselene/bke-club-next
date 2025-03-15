import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS, GET_CATEGORIES } from "@/lib/graphql/queries";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { NewsFilter } from "@/app/components/news/NewsFilter";
import type { Post } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Tin tức | HUST Research Clubs Network",
  description: "Tin tức và thông báo mới nhất từ Mạng lưới",
};

export const revalidate = 3600; // Revalidate every hour

interface CategoryNode {
  slug: string;
  name: string;
}

interface NewsData {
  posts: {
    nodes: Post[];
  };
  categories: {
    nodes: CategoryNode[];
  };
}

async function getNewsData() {
  const { data } = await getClient().query<NewsData>({
    query: GET_POSTS,
    variables: {
      first: 100,
    },
  });

  const { data: categoryData } = await getClient().query<NewsData>({
    query: GET_CATEGORIES,
  });

  const categories = categoryData.categories.nodes.filter(
    (category) => category.slug !== "event"
  );

  return {
    posts: data.posts.nodes,
    categories,
  };
}

export default async function NewsPage() {
  const { posts, categories } = await getNewsData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Tin tức"
        description="Tin tức và thông báo mới nhất từ Mạng lưới"
      />
      <NewsFilter categories={categories} posts={posts} />
    </div>
  );
}
