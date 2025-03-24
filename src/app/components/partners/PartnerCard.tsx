"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPinned, Globe } from "lucide-react";

import type { Partner, PartnerRegion, PartnerType } from "@/types/wordpress";

interface PartnerCardProps {
  partner: Partner;
}

const regionLabels: Record<PartnerRegion, string> = {
  local: "Việt Nam",
  global: "Quốc tế",
};

const typeLabels: Record<PartnerType, string> = {
  academic: "Học thuật",
  business: "Doanh nghiệp",
  organization: "Tổ chức",
};

export function PartnerCard({ partner }: PartnerCardProps) {
  const region = partner.partnerData.region[0];
  const type = partner.partnerData.type[0];

  return (
    <div className="w-full h-full">
      <Link href={partner.partnerData.website} className="block h-full">
        <article className="group h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          {partner.featuredImage?.node.sourceUrl && (
            <div className="relative h-32 w-full overflow-hidden bg-white">
              <Image
                src={partner.featuredImage.node.sourceUrl}
                alt={partner.title}
                fill
                className="object-contain p-4"
              />
            </div>
          )}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Region & Type Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {region && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    <MapPinned className="h-3 w-3" />
                    {regionLabels[region]}
                  </span>
                )}
                {type && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {typeLabels[type]}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
                {partner.title}
              </h3>

              {partner.partnerData.website && (
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-auto">
                  <Globe className="h-4 w-4 text-cardinal-500" />
                  <span className="truncate">
                    {new URL(partner.partnerData.website).hostname.replace(
                      "www.",
                      ""
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
