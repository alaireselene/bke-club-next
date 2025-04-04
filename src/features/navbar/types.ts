import type { Club } from "@/lib/directus"; // Assuming Club is defined here

// Define the shared navigation school type
export interface NavSchool {
  id: number;
  name: string;
  slug: string;
  clubs: Club[]; // Include clubs as DesktopMenu requires it
}

// Re-export Club if needed elsewhere in the feature, or define it here if not in directus.ts
export type { Club };