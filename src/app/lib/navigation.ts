import { db } from "@/db";
import { school, club } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { School, Club } from "@/app/components/navigation/types";

export async function getNavigationData(): Promise<{
  schools: School[];
  clubs: Club[];
}> {
  // Fetch all schools
  const schools = await db
    .select({
      id: school.id,
      name: school.name,
      slug: school.slug,
    })
    .from(school)
    .orderBy(school.name);

  // Fetch all clubs with schoolId
  const clubs = await db
    .select({
      id: club.id,
      name: club.name,
      slug: club.slug,
      schoolId: club.schoolId,
    })
    .from(club)
    .orderBy(club.name);

  return {
    schools,
    clubs,
  };
}