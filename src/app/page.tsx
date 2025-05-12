import { Metadata } from "next";

import Hero from "@/features/homepage/components/Hero/Hero";
import PartnersPreview from "@/features/partners/components/PartnersPreview/PartnersPreview";
import { FeaturedLink } from "@/features/homepage/components/FeaturedLink";
import News from "@/features/homepage/components/NewsPreview/news";
import Events from "@/features/homepage/components/EventPreview/events";
import MissionCTA from "@/features/homepage/components/MissionCta/mission-cta";
import StudyFields from "@/features/homepage/components/StudyField/study-fields";

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

export default async function HomePage() {
    return (
      <>
        <Hero />
        <FeaturedLink />
        <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-full">
            <News />
          </div>
          <div className="md:col-span-1 h-full">
            <Events />
          </div>
        </div>
        <MissionCTA />
        <PartnersPreview />
        <StudyFields />
      </>
    )
}
