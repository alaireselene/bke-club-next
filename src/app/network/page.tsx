import { Metadata } from "next";
import { directus, School, Club } from "@/lib/directus"; // Import directus client and types
import { readItems } from "@directus/sdk"; // Import readItems function
import { NetworkContent } from "@/features/network/components/NetworkContent/NetworkContent";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
// School type will be updated later in src/features/network/types.ts
// We'll define a combined type here for now
type SchoolWithClubs = School & { clubs: Club[] };

export const metadata: Metadata = {
  title: "Mạng lưới | HUST Research Clubs Network",
  description: "Tìm hiểu và kết nối với các câu lạc bộ nghiên cứu tại HUST",
};

interface Props {
  searchParams: { school?: string };
}

// Revalidate cache every hour
export const revalidate = 60;

async function getNetworkData(): Promise<{ schools: SchoolWithClubs[] }> {
  try {
    // Fetch all schools
    const schoolsData = await directus.request(readItems('school', {
      fields: ['*'],
      limit: -1 // Fetch all
    }));
    const schools = schoolsData as School[];

    // Fetch all clubs with their related school info
    const clubsData = await directus.request(readItems('club', {
      fields: ['*'], // Get related school fields
    }));
    const clubs = clubsData as Club[];

    // Combine data: Add clubs array to each school
    const schoolsWithClubs = schools.map(school => ({
      ...school,
      clubs: clubs.filter(club => club.school_id === school.id)
    }));

    return {
      schools: schoolsWithClubs,
      // timestamp: new Date().toISOString(), // Timestamp can be removed if not needed
    };
  } catch (error) {
    console.error("Failed to fetch network data from Directus:", error);
    // Return empty array or throw error based on desired handling
    return { schools: [] };
  }
}

export default async function NetworkPage({ searchParams }: Props) {
  const { schools: unsortedSchoolsWithClubs } = await getNetworkData();

  // Sort schools in the same order as DesktopMenu:
  // 1. Schools starting with "Trường"
  // 2. Schools starting with "Khoa"
  // 3. Others
  // Apply sorting to the schools array from the combined data
  const schools = [
    ...unsortedSchoolsWithClubs.filter(
      (school) => school.name?.startsWith("Trường") ?? false
    ),
    ...unsortedSchoolsWithClubs.filter(
      (school) => school.name?.startsWith("Khoa") ?? false
    ),
    ...unsortedSchoolsWithClubs.filter(
      (school) =>
        !(school.name?.startsWith("Trường") ?? false) &&
        !(school.name?.startsWith("Khoa") ?? false)
    ),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#003366] opacity-5 -rotate-1" />
          <PageHeader
            title="Mạng lưới"
            description="Tìm hiểu và kết nối với các câu lạc bộ nghiên cứu tại HUST"
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        <NetworkContent
          schools={schools}
          initialSchoolFilter={searchParams.school}
        />
      </div>
    </main>
  );
}

// Generate static params for initial build
// Generate static params for initial build using Directus
export async function generateStaticParams() {
  try {
    const schoolsData = await directus.request(readItems('school', {
      fields: ['slug'], // Only need slug
    }));
    const schools = schoolsData as Pick<School, 'slug'>[]; // Use Pick for partial type

    return schools
      .map((school) => ({
        // Use lowercase slug as param? Check NetworkContent usage. Assuming lowercase for now.
        school: school.slug?.toLowerCase(),
      }))
      .filter((params): params is { school: string } => !!params.school); // Type guard for filtering null/undefined slugs
  } catch (error) {
    console.error("Failed to fetch schools for static params:", error);
    return [];
  }
}
