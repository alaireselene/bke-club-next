import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GET_CLUB_BY_SLUG, GET_NAVIGATION_DATA } from "@/lib/graphql/queries";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { ClubDetails } from "@/app/components/network/ClubDetails";
import type { Club } from "@/types/wordpress";

interface Props {
  params: {
    slug: string;
  };
}

interface ClubData {
  club: Club;
}

async function getClubData(slug: string): Promise<ClubData | null> {
  try {
    const { data } = await getClient().query<ClubData>({
      query: GET_CLUB_BY_SLUG,
      variables: {
        slug: slug,
      },
      context: {
        fetchOptions: {
          next: {
            tags: ["clubs"],
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch club data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getClubData(params.slug);

  if (!data) {
    return {
      title: "Không tìm thấy câu lạc bộ | HUST Research Clubs Network",
      description: "Câu lạc bộ này không tồn tại, hoặc đã bị xóa.",
    };
  }

  return {
    title: `${data.club.title} | HUST Research Clubs Network`,
    description: data.club.content
      ? data.club.content.slice(0, 160).replace(/<[^>]*>/g, "")
      : `Chi tiết về CLB ${data.club.title}`,
    openGraph: data.club.featuredImage
      ? {
          images: [data.club.featuredImage.node.sourceUrl],
        }
      : undefined,
  };
}

export default async function ClubPage({ params }: Props) {
  const data = await getClubData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#003366] opacity-5 -rotate-1" />
          <PageHeader
            title={data.club.title}
            breadcrumbItems={[
              { label: "Mạng lưới thành viên", href: "/network" },
              {
                label: data.club.title,
                href: `/network/${data.club.slug}`,
                current: true,
              },
            ]}
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        <ClubDetails club={data.club} school={data.club.school?.node || null} />
      </div>
    </main>
  );
}

// Generate static params for initial build
export async function generateStaticParams() {
  const { data } = await getClient().query<{
    schools: {
      nodes: Array<{
        clubs: {
          nodes: Array<{ slug: string }>;
        };
      }>;
    };
  }>({
    query: GET_NAVIGATION_DATA,
    variables: {
      first: 100, // Get up to 100 clubs for static paths
    },
  });

  return data.schools.nodes
    .flatMap((school) => school.clubs.nodes)
    .map((club) => ({
      slug: club.slug,
    }));
}
