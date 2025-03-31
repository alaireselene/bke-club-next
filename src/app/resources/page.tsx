import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_RESOURCES } from "@/features/resources/graphql/queries";
import { ResourceGrid } from "@/features/resources/components/ResourceGrid";

export const metadata: Metadata = {
  title: "Tài liệu | BKE Club",
  description: "Tài liệu và tư liệu học tập từ BKE Club",
};

export default async function ResourcesPage() {
  const { data } = await getClient().query({
    query: GET_RESOURCES,
  });

  const resources = data.resources.nodes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tài liệu</h1>
      <ResourceGrid resources={resources} />
    </div>
  );
}
