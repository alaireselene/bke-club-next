import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_FACILITIES } from "@/features/facilities/graphql/queries";
import { FacilityGrid } from "@/features/facilities/components/FacilityGrid";

export const metadata: Metadata = {
  title: "Cơ sở vật chất | BKE Club",
  description: "Thông tin về các cơ sở vật chất của BKE Club",
};

export default async function FacilitiesPage() {
  const { data } = await getClient().query({
    query: GET_FACILITIES,
  });

  const facilities = data.facilities.nodes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cơ sở vật chất</h1>
      <FacilityGrid facilities={facilities} />
    </div>
  );
}
