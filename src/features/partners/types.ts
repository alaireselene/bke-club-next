// Import the Partner type directly from the Directus definition
import type { Partner as DirectusPartner } from "@/lib/directus";

// Keep these type aliases if they are used for filtering/display logic elsewhere.
// The actual string values might need to be updated based on Directus data.
type PartnerRegion = 'local' | 'global'; // Use string, specific values depend on Directus setup
type PartnerType = 'academic' | 'business' | 'organization';   // Use string, specific values depend on Directus setup

// Re-export the Directus Partner type for use within this feature
export type Partner = DirectusPartner;

// Export the region and type helpers if still needed
export type { PartnerRegion, PartnerType };