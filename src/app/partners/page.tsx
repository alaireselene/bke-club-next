import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_PARTNERS } from "@/lib/graphql/queries";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { PartnersList } from "@/app/components/partners/PartnersList";
import type { Partner } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Đối tác | HUST Research Clubs Network",
  description: "Đối tác trong nước và quốc tế của Mạng lưới",
};

interface PartnersData {
  partners: {
    nodes: Partner[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

async function getPartnersData() {
  const { data } = await getClient().query<PartnersData>({
    query: GET_PARTNERS,
    variables: {
      first: 100,
    },
  });

  return {
    partners: data.partners.nodes,
  };
}

export default async function PartnersPage() {
  const { partners } = await getPartnersData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <PageHeader
          title="Đối tác"
          description="Đối tác trong nước và quốc tế của Mạng lưới"
        />

        <PartnersList partners={partners} />
      </div>
    </div>
  );
}
