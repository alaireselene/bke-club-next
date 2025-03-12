import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { club, school, user, userInClub } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { ClubDetails } from "@/app/components/network/ClubDetails";
import type { Club, School, User } from "@/db/schema";

interface Props {
  params: {
    slug: string;
  };
}

interface ClubData {
  club: Club;
  school: School | null;
  leadership: {
    president: User | null;
    advisors: User[];
  };
}

async function getClubData(slug: string): Promise<ClubData | null> {
  const clubData = await db
    .select()
    .from(club)
    .where(eq(club.slug, slug))
    .then((rows) => rows[0]);

  if (!clubData) {
    return null;
  }

  const [schoolData, leadershipRows] = await Promise.all([
    // Get school
    clubData.schoolId
      ? db
          .select()
          .from(school)
          .where(eq(school.id, clubData.schoolId))
          .then((rows) => rows[0])
      : null,

    // Get advisors
    db
      .select({
        user: user,
      })
      .from(userInClub)
      .where(
        and(eq(userInClub.clubId, clubData.id), eq(userInClub.role, "advisor"))
      )
      .innerJoin(user, eq(userInClub.userId, user.id)),
  ]);

  // Get president
  const presidentRow = await db
    .select()
    .from(user)
    .innerJoin(
      userInClub,
      and(
        eq(userInClub.userId, user.id),
        eq(userInClub.clubId, clubData.id),
        eq(userInClub.role, "president")
      )
    )
    .then((rows) => rows[0]?.user);

  return {
    club: clubData,
    school: schoolData,
    leadership: {
      president: presidentRow || null,
      advisors: leadershipRows.map((row) => row.user),
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getClubData(params.slug);

  if (!data) {
    return {
      title: "Không tìm thấy câu lạc bộ | HUST Research Clubs Network",
    };
  }

  return {
    title: `${data.club.name} | HUST Research Clubs Network`,
    description: data.club.description.slice(0, 160),
  };
}

export default async function ClubPage({ params }: Props) {
  const data = await getClubData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={data.club.name}
        breadcrumbItems={[
          { text: "Mạng lưới thành viên", href: "/network" },
          { text: data.club.name, href: `/network/${data.club.slug}` },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <ClubDetails
          club={data.club}
          school={data.school}
          leadership={data.leadership}
        />
      </div>
    </>
  );
}
