import { Metadata } from "next";
import { db } from "@/db";
import { school, club } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { NetworkContent } from "./NetworkContent";

export const metadata: Metadata = {
  title: "Mạng lưới thành viên | HUST Research Clubs Network",
  description:
    "Khám phá mạng lưới các câu lạc bộ sinh viên nghiên cứu tại HUST",
};

async function getNetworkData(schoolFilter?: string) {
  // Get all schools
  const schools = await db.select().from(school).orderBy(school.name);

  // Get all clubs with their school relationships
  const clubs = await db.select().from(club).orderBy(club.name);

  // Group clubs by school
  const clubsBySchool = clubs.reduce((acc, club) => {
    if (club.schoolId) {
      if (!acc[club.schoolId]) {
        acc[club.schoolId] = [];
      }
      acc[club.schoolId].push(club);
    }
    return acc;
  }, {} as Record<number, typeof clubs>);

  return {
    schools,
    clubsBySchool,
  };
}

export default async function NetworkPage({
  searchParams,
}: {
  searchParams: { school?: string };
}) {
  const { schools, clubsBySchool } = await getNetworkData();

  return (
    <>
      <PageHeader
        title="Mạng lưới thành viên"
        description="Khám phá mạng lưới các câu lạc bộ sinh viên nghiên cứu tại HUST"
      />

      <div className="container mx-auto px-4 py-8">
        <NetworkContent
          initialSchools={schools}
          initialClubsBySchool={clubsBySchool}
          initialSchoolFilter={searchParams.school}
        />
      </div>
    </>
  );
}
