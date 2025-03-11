import { Metadata } from "next";
import { db } from "@/db";
import { post, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { NewsFilter } from "@/app/components/news/NewsFilter";
import { NewsCard } from "@/app/components/ui/NewsCard";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tin tức | HUST Research Clubs Network",
  description: "Tin tức và thông báo mới nhất từ Mạng lưới",
};

const categories = [
  { id: "research", name: "Nghiên cứu" },
  { id: "announcement", name: "Thông báo" },
  { id: "news", name: "Tin tức" },
  { id: "achievement", name: "Thành tựu" },
];

interface Post {
  id: number;
  title: string;
  summary: string | null;
  category: "news" | "announcement" | "research" | "achievement";
  createdAt: Date;
  featuredImageUrl: string | null;
  author: {
    fullName: string;
  };
}

async function getNewsData() {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      summary: post.summary,
      category: post.category,
      createdAt: post.createdAt,
      featuredImageUrl: post.featuredImageUrl,
      author: {
        fullName: user.fullName,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.authorId, user.id))
    .orderBy(desc(post.createdAt));

  return {
    posts,
  };
}

export default async function NewsPage() {
  const { posts } = await getNewsData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Tin tức" description="Các tin tức mới nhất" />

      <Suspense fallback={<div>Loading...</div>}>
        <NewsFilter categories={categories} posts={posts} />
      </Suspense>
    </div>
  );
}
