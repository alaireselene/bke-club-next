import type { Club } from "../../types"; // Keep using the feature's Club type (already updated)
import type { School } from "@/lib/directus"; // Import the Directus School type

// Remove the old SchoolBasicInfo interface

interface ClubDetailsProps {
  club: Club;
  school: School | null; // Use the Directus School type
  className?: string;
}

export type { ClubDetailsProps }; // Export only ClubDetailsProps