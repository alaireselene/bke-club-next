import { Metadata } from "next";
import { directus, Facility } from "@/lib/directus"; // Import directus client and Facility type
import { readItems } from "@directus/sdk"; // Import readItems function
import { FacilityGrid } from "@/features/facilities/components/FacilityGrid"; // Keep FacilityGrid import

export const metadata: Metadata = {
  title: "Cơ sở vật chất | BKE Club",
  description: "Thông tin về các cơ sở vật chất của BKE Club",
};

export default async function FacilitiesPage() {
  // Fetch data using Directus SDK
  const facilitiesData = await directus.request(readItems('facility', {
    fields: ['*'], // Fetch all fields defined in the schema for 'facility'
    // Add any necessary sorting or filtering here if needed
  }));

  const facilities = facilitiesData as Facility[]; // Assert type based on import from directus.ts

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cơ sở vật chất</h1>
      <FacilityGrid facilities={facilities} />
    </div>
  );
}
