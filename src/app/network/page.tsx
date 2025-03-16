import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_NAVIGATION_DATA } from "@/lib/graphql/queries";
import { NetworkContent } from "@/app/components/network/NetworkContent";
import type { School } from "@/types/wordpress";

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
  const { schools } = await getNetworkData();

  // Add timestamp comment for debugging cache
  return (
    <>
      {/* Cache timestamp: ${timestamp} */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <NetworkContent
          schools={schools}
          initialSchoolFilter={searchParams.school}
        />
      </div>
    </>
  );
}

// Generate static params for initial build
export async function generateStaticParams() {
  const { schools } = await getNetworkData();

  return schools
    .map((school) => ({
      school: school.slug?.toUpperCase(),
    }))
    .filter((params) => params.school);
}
