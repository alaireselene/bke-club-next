import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_NAVIGATION_DATA } from "@/lib/graphql/queries";
import { NetworkContent } from "@/features/network/components/NetworkContent/NetworkContent";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import type { School } from "@/features/network";

export const metadata: Metadata = {
  title: "Mạng lưới | HUST Research Clubs Network",
  description: "Tìm hiểu và kết nối với các câu lạc bộ nghiên cứu tại HUST",
};

interface Props {
  searchParams: { school?: string };
}

// Revalidate cache every hour
export const revalidate = 3600;

async function getNetworkData() {
  try {
    const { data } = await getClient().query({
      query: GET_NAVIGATION_DATA,
      variables: {
        first: 50, // Max clubs per school
      },
      context: {
        fetchOptions: {
          next: {
            // Tags for granular revalidation
            tags: ["schools", "clubs"],
          },
        },
      },
    });

    return {
      schools: data.schools.nodes as School[],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch network data:", error);
    throw new Error("Failed to fetch network data");
  }
}

export default async function NetworkPage({ searchParams }: Props) {
  const { schools: unsortedSchools } = await getNetworkData();

  // Sort schools in the same order as DesktopMenu:
  // 1. Schools starting with "Trường"
  // 2. Schools starting with "Khoa"
  // 3. Others
  const schools = [
    ...unsortedSchools.filter(
      (school) => school.name?.startsWith("Trường") ?? false
    ),
    ...unsortedSchools.filter(
      (school) => school.name?.startsWith("Khoa") ?? false
    ),
    ...unsortedSchools.filter(
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
export async function generateStaticParams() {
  const { schools: unsortedSchools } = await getNetworkData();

  // Use the same sorting logic for consistency
  const schools = [
    ...unsortedSchools.filter(
      (school) => school.name?.startsWith("Trường") ?? false
    ),
    ...unsortedSchools.filter(
      (school) => school.name?.startsWith("Khoa") ?? false
    ),
    ...unsortedSchools.filter(
      (school) =>
        !(school.name?.startsWith("Trường") ?? false) &&
        !(school.name?.startsWith("Khoa") ?? false)
    ),
  ];

  return schools
    .map((school) => ({
      school: school.slug?.toUpperCase(),
    }))
    .filter((params) => params.school);
}
