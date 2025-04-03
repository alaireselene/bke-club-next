// Import the Facility type directly from the Directus definition
import type { Facility as DirectusFacility } from "@/lib/directus";

// Keep this type alias. The Directus 'status' field is optional string,
// but this might be used for display logic. Adjust if Directus uses different values.
export type FacilityStatus = string; // Use string, specific values depend on Directus setup ('working' | 'pending' might still be valid)

// Re-export the Directus Facility type for use within this feature
export type Facility = DirectusFacility;

// Remove the old FacilityData interface

export interface FacilityCardProps {
  facility: Facility;
  onOpen: (facility: Facility) => void;
}

export interface FacilityDialogProps {
  facility: Facility;
  isOpen: boolean;
  onClose: () => void;
} 