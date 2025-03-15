import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { GET_PARTNER_BY_SLUG } from "@/lib/graphql/queries";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { MapPinned, Globe, Building2 } from "lucide-react";
import type { Partner } from "@/types/wordpress";

interface Props {
  params: {
    slug: string;
  };
}

interface PartnerData {
  partner: Partner;
}

const regionLabels = {
  local: "Việt Nam",
  global: "Quốc tế",
} as const;

const typeLabels = {
  academic: "Học thuật",
  business: "Doanh nghiệp",
  organization: "Tổ chức",
} as const;

async function getPartnerData(slug: string): Promise<PartnerData | null> {
  try {
    const { data } = await getClient().query<PartnerData>({
      query: GET_PARTNER_BY_SLUG,
      variables: {
        slug: slug,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch partner data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPartnerData(params.slug);

  if (!data) {
    return {
      title: "Không tìm thấy đối tác | HUST Research Clubs Network",
      description: "Đối tác này không tồn tại, hoặc đã bị xóa.",
    };
  }

  return {
    title: `${data.partner.title} | HUST Research Clubs Network`,
    description: data.partner.content.slice(0, 160).replace(/<[^>]*>/g, ""),
    openGraph: data.partner.featuredImage
      ? {
          images: [data.partner.featuredImage.node.sourceUrl],
        }
      : undefined,
  };
}

export default async function PartnerPage({ params }: Props) {
  const data = await getPartnerData(params.slug);

  if (!data) {
    notFound();
  }

  const { partner } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <PageHeader
          title={partner.title}
          breadcrumbItems={[
            { text: "Đối tác", href: "/partners" },
            { text: partner.title, href: `/partners/${partner.slug}` },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              {/* Logo */}
              {partner.featuredImage?.node.sourceUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-white border-b border-slate-100">
                  <Image
                    src={partner.featuredImage.node.sourceUrl}
                    alt={partner.title}
                    fill
                    className="object-contain p-8"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-6 space-y-6">
                {/* Type & Region */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building2 className="h-4 w-4 text-cardinal-500" />
                    <span>{typeLabels[partner.partnerFields.type]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPinned className="h-4 w-4 text-cardinal-500" />
                    <span>{regionLabels[partner.partnerFields.region]}</span>
                  </div>
                  {partner.partnerFields.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-cardinal-500" />
                      <a
                        href={partner.partnerFields.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cardinal-600 hover:underline truncate"
                      >
                        {new URL(partner.partnerFields.website).hostname}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-6">
              <div className="prose prose-base max-w-none prose-headings:text-cardinal-700 prose-headings:font-semibold prose-p:text-slate-600 prose-a:text-cardinal-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-strong:text-cardinal-700 prose-ul:text-slate-600 prose-ol:text-slate-600">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: partner.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
