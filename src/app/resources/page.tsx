import { Metadata } from "next";
import { directus, Resource } from "@/lib/directus"; // Import directus client and Resource type
import { readItems } from "@directus/sdk"; // Import readItems function
import { ResourceGrid } from "@/features/resources/components/ResourceGrid"; // Keep ResourceGrid import

export const metadata: Metadata = {
  title: "Tài liệu | BKE Club",
  description: "Tài liệu và tư liệu học tập từ BKE Club",
};

export default async function ResourcesPage() {
  // Fetch data using Directus SDK
  const resourcesData = await directus.request(readItems('resource', {
    fields: ['*'], // Fetch all fields defined in the schema for 'resource'
    // Add any necessary sorting or filtering here if needed
  }));

  const resources = resourcesData as Resource[]; // Assert type based on import from directus.ts

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tài liệu</h1>
      <ResourceGrid resources={resources} />
    </div>
  );
}
