import type { Club } from "../../types"

interface SchoolBasicInfo {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

interface ClubDetailsProps {
  club: Club;
  school: SchoolBasicInfo | null;
  className?: string;
}

export type { SchoolBasicInfo, ClubDetailsProps }