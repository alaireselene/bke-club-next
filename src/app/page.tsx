// FIXME: Partners card is not configure right
// FIXME: Events card is screw up, not follow 2x2 layout

import { Metadata } from "next";
import { directus, Post, Event, Club, Partner } from "@/lib/directus"; // Import directus client and types
import { readItems } from "@directus/sdk"; // Import readItems function
// Remove GraphQL query imports

import { Hero } from "@/features/homepage/components/Hero/Hero";
import { LatestNews } from "@/features/news/components/LatestNews/LatestNews";
import { LatestEvents } from "@/features/events/components/LatestEvents/LatestEvents";
import { ResearchAreas } from "@/features/homepage/components/ResearchAreas/ResearchAreas";
import { QuickAbout } from "@/features/homepage/components/QuickAbout/QuickAbout";
import { PartnersPreview } from "@/features/partners/components/PartnersPreview";
// Import feature types - some might need updating (e.g., Event)
import type { News } from "@/features/news/types";
import type { Event as FeatureEvent } from "@/features/events/types"; // Assuming this exists
import type { Partner as FeaturePartner } from "@/features/partners/types";

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
  // Fetch data in parallel using Directus SDK
  const [newsItems, eventItems, clubItems, partnerItems] = await Promise.all([
    directus.request(readItems('post', {
      limit: 5,
      sort: ['-date_created'], // Sort by newest
      fields: ['*'] // Fetch needed fields for FeaturedNews
    })),
    directus.request(readItems('event', {
      limit: 5,
      sort: ['event_start'], // Sort by upcoming start date
      filter: { event_end: { _gte: "$NOW" } }, // Filter for upcoming/ongoing events
      fields: ['*'] // Fetch needed fields for FeaturedEvents
    })),
    directus.request(readItems('club', {
      fields: ['id', 'members_count'] // Only fetch fields needed for stats
    })),
    directus.request(readItems('partner', {
      fields: ['*'], // Fetch needed fields for PartnersPreview
    })),
  ]);

  // Calculate stats
  // Cast fetched data
  const featuredNews = newsItems as Post[];
  const upcomingEvents = eventItems as Event[];
  const allClubs = clubItems as Pick<Club, 'id' | 'members_count'>[]; // Use Pick for partial type
  const allPartners = partnerItems as Partner[];

  // Calculate stats using Directus data
  const clubCount = allClubs.length;
  const memberCount = allClubs.reduce(
    (acc: number, club) => acc + (club.members_count || 0),
    0
  );
  const partnerCount = allPartners.length;
  // Note: Event count might differ if filtering upcoming events vs. all events
  const eventCount = upcomingEvents.length; // Count only the fetched upcoming events

  const stats = [
    { label: "Câu lạc bộ" as const, value: clubCount.toString() },
    { label: "Thành viên" as const, value: memberCount.toString() },
    { label: "Đối tác" as const, value: partnerCount.toString() },
    { label: "Sự kiện" as const, value: eventCount.toString() },
  ];

  return {
    stats,
    featuredNews: featuredNews,
    upcomingEvents: upcomingEvents,
    // Pass all partners to the preview component
    partners: allPartners,
  };
}

export default async function HomePage() {
  const { stats, featuredNews, upcomingEvents, partners } =
    await getHomePageData();

  return (
    <main className="bg-white">
      {/* Each section uses standardized container and spacing */}
      <section className="section-container">
        <Hero stats={stats} />
      </section>

      <section className="section-container">
        <QuickAbout />
      </section>

      <section className="section-container">
        <ResearchAreas />
      </section>

      <section className="section-container">
        <LatestNews news={featuredNews as News[]} />
      </section>

      <section className="section-container">
        <PartnersPreview partners={partners as FeaturePartner[]} />
      </section>

      <section className="section-container">
        <LatestEvents events={upcomingEvents as FeatureEvent[]} />
      </section>
    </main>
  );
}
