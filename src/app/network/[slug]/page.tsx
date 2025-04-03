import { Metadata } from "next";
import { notFound } from "next/navigation";
import { directus, Club, School } from "@/lib/directus"; // Import directus client and types
import { readItem, readItems } from "@directus/sdk"; // Import SDK functions
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { ClubDetails } from "@/features/network/components/ClubDetails/ClubDetails";
import type { Club as FeatureClub } from "@/features/network"; // Keep feature's Club type alias if needed by ClubDetails initially
import { createExcerpt } from "@/lib/utils/contentModify"; // Import excerpt util

// Assuming the directory is renamed from [slug] to [id]
interface Props {
  params: { id: string }; // Expect 'id' instead of 'slug'
}

// Remove GraphQL specific ClubData interface

// Helper function to fetch club data
async function getClubData(id: string): Promise<Club | null> {
  try {
    // Use correct syntax to fetch related school fields
    const clubData = await directus.request(readItem('club', id, {
      fields: ['*', { school_id: ['*'] }], // Fetch all club fields and all related school fields
    }));
    // The SDK should return the school_id field as a School object if fetched correctly,
    // or as a number (the ID) if not fetched deeply, or potentially undefined/null if empty.
    // No need for manual type assertion or null assignment here if the fetch is correct.
    return clubData as Club;
  } catch (error) {
    // Directus readItem throws error if not found
    console.error(`Error fetching club ${id}:`, error);
    return null; // Return null if club not found or other error
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const club = await getClubData(params.id);

  if (!club) {
    return {
      title: "Không tìm thấy câu lạc bộ | HUST Research Clubs Network",
      description: "Câu lạc bộ này không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${club.name} | HUST Research Clubs Network`, // Use club.name
    // Generate description from club.description (assuming HTML)
    description: createExcerpt(club.description, 25), // Longer excerpt for description
    // Remove openGraph image as Club schema doesn't have one
    openGraph: undefined,
  };
}

export default async function ClubPage({ params }: Props) {
  const club = await getClubData(params.id);

  if (!club) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#003366] opacity-5 -rotate-1" />
          <PageHeader
            title={club.name} // Use club.name
            breadcrumbItems={[
              { label: "Mạng lưới thành viên", href: "/network" },
              {
                label: club.name, // Use club.name
                href: `/network/${club.id}`, // Use club.id
                current: true,
              },
            ]}
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        {/* Pass club and the fetched school object (if available) */}
        {/* Pass club and the fetched school object (which might be null/undefined/number if fetch failed/empty) */}
        {/* We cast club to FeatureClub for now, assuming ClubDetails still needs refactoring */}
        <ClubDetails club={club as FeatureClub} school={club.school_id as School | null} />
      </div>
    </main>
  );
}

// Generate static params for initial build using Directus
export async function generateStaticParams() {
 try {
    const clubsData = await directus.request(readItems('club', {
      fields: ['id'], // Only need id
      limit: -1 // Fetch all
    }));
    const clubs = clubsData as Pick<Club, 'id'>[];

    return clubs.map((club) => ({
      id: club.id.toString(), // Param should be string
    }));
  } catch (error) {
    console.error("Failed to fetch clubs for static params:", error);
    return [];
  }
}
