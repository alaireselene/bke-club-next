import { Metadata } from "next";
import { db } from "@/db";
import { event, post } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { Hero } from "@/app/components/Hero";
import { FeaturedNews } from "@/app/components/FeaturedNews";
import { FeaturedEvents } from "@/app/components/FeaturedEvents";

export const metadata: Metadata = {
  title: "Trang chủ | HUST Research Clubs Network",
  description:
    "Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và đổi mới tại Đại học Bách khoa Hà Nội",
  openGraph: {
    title: "HUST Research Clubs Network",
    description: "Kết nối, Thúc đẩy, Đổi mới",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HUST Research Clubs Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUST Research Clubs Network",
    description: "Kết nối, Thúc đẩy, Đổi mới",
    images: ["/opengraph-image"],
  },
};

async function getHomePageData() {
  const [clubCount, memberCount, projectCount, eventCount] = await Promise.all([
    // Get club count
    db
      .select({ count: sql<number>`count(*)` })
      .from(sql`club`)
      .then((res) => res[0].count),

    // Get member count (from user_in_club)
    db
      .select({ count: sql<number>`count(distinct userId)` })
      .from(sql`user_in_club`)
      .then((res) => res[0].count),

    // Get project count (from research where status = 'active')
    db
      .select({ count: sql<number>`count(*)` })
      .from(sql`research`)
      .where(sql`status = 'active'`)
      .then((res) => res[0].count),

    // Get upcoming event count
    db
      .select({ count: sql<number>`count(*)` })
      .from(event)
      .where(sql`startDate > current_timestamp`)
      .then((res) => res[0].count),
  ]);

  // Get featured posts (latest 5)
  const featuredPosts = await db
    .select()
    .from(post)
    .orderBy(desc(post.createdAt))
    .limit(5);

  // Get upcoming events (next 5)
  const upcomingEvents = await db
    .select()
    .from(event)
    .where(sql`startDate > current_timestamp`)
    .orderBy(event.startDate)
    .limit(5);

  const stats = [
    { label: "Câu lạc bộ" as const, value: clubCount.toString() },
    { label: "Thành viên" as const, value: memberCount.toString() },
    { label: "Dự án" as const, value: projectCount.toString() },
    { label: "Sự kiện" as const, value: eventCount.toString() },
  ];

  return {
    stats,
    featuredPosts,
    upcomingEvents,
  };
}

export default async function HomePage() {
  const { stats, featuredPosts, upcomingEvents } = await getHomePageData();

  return (
    <main>
      <Hero stats={stats} />
      <FeaturedNews posts={featuredPosts} />
      <FeaturedEvents events={upcomingEvents} />
    </main>
  );
}
