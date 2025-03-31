// FIXME: Partners card is not configure right
// FIXME: Events card is screw up, not follow 2x2 layout

import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/features/events/graphql/queries";
import { GET_CLUBS } from "@/features/network/graphql/queries";

import { GET_ALL_NEWS } from "@/features/news/graphql/queries";
import { GET_PARTNERS } from "@/features/partners/graphql/queries";

import { Hero } from "@/features/homepage/components/Hero/Hero";
import { FeaturedNews } from "@/features/news/components/FeaturedNews/FeaturedNews";
import { FeaturedEvents } from "@/features/events/components/FeaturedEvents/FeaturedEvents";
import { ResearchAreas } from "@/features/homepage/components/ResearchAreas/ResearchAreas";
import { QuickAbout } from "@/features/homepage/components/QuickAbout/QuickAbout";
import { PartnersPreview } from "@/features/partners/components/PartnersPreview";
import type { Club } from "@/features/network/types";

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
  const client = getClient();

  // Get data in parallel
  const [newsData, eventsData, clubsData, partnersData] = await Promise.all([
    client.query({
      query: GET_ALL_NEWS,
      variables: { first: 5 },
    }),
    client.query({
      query: GET_ALL_EVENTS,
      variables: { first: 5 },
    }),
    client.query({
      query: GET_CLUBS,
      variables: { first: 100 }, // Maximum clubs
    }),
    client.query({
      query: GET_PARTNERS,
      variables: { first: 100 }, // Maximum partners
    }),
  ]);

  // Calculate stats
  const clubCount = clubsData.data.clubs.nodes.length;
  const memberCount = clubsData.data.clubs.nodes.reduce(
    (acc: number, club: Club) => acc + (club.clubData?.membersCount || 0),
    0
  );
  const partnerCount = partnersData.data.partners.nodes.length;
  const eventCount = eventsData.data.posts.nodes.length;

  const stats = [
    { label: "Câu lạc bộ" as const, value: clubCount.toString() },
    { label: "Thành viên" as const, value: memberCount.toString() },
    { label: "Đối tác" as const, value: partnerCount.toString() },
    { label: "Sự kiện" as const, value: eventCount.toString() },
  ];

  return {
    stats,
    featuredNews: newsData.data.posts.nodes,
    upcomingEvents: eventsData.data.posts.nodes,
    partners: partnersData.data.partners.nodes,
  };
}

export default async function HomePage() {
  const { stats, featuredNews, upcomingEvents, partners } =
    await getHomePageData();

  return (
    <main>
      <Hero stats={stats} />

      {/* Quick About Section */}
      <QuickAbout />

      {/* Research Areas */}
      <ResearchAreas />

      {/* Featured News */}
      <FeaturedNews news={featuredNews} />

      {/* Partners Section */}
      <PartnersPreview partners={partners} />

      {/* Featured Events */}
      <FeaturedEvents events={upcomingEvents} />
    </main>
  );
}
