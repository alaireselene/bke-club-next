// Import the base Directus types
import type { School as DirectusSchool, Club as DirectusClub } from "@/lib/directus";

// Define the Club type for this feature, re-exporting the Directus one
export type Club = DirectusClub;

// Define the School type for this feature, extending the Directus one
// to include the array of clubs we added in getNetworkData
export interface School extends DirectusSchool {
  clubs: Club[]; // Add the clubs array
}

// Note: The original Club type had nested 'clubData' and 'school.node'.
// The Directus 'Club' type has fields like 'established_date', 'members_count',
// 'president_name', 'president_email', 'advisors' (json), and 'school_id' (relation).
// Components using these types will need to be updated accordingly.