"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { BaseCard } from "./BaseCard";

type BasePartnerDetails = {
  logo: string;
  name: string;
  description: string;
  website: string;
};

type AcademicPartner = BasePartnerDetails & {
  type: "academic";
  details: {
    region: string;
  };
};

type BusinessPartner = BasePartnerDetails & {
  type: "business";
  details: {
    industry: string;
    cooperationType: string;
    internshipInfo?: string;
  };
};

type PartnerCardProps = {
  partner: AcademicPartner | BusinessPartner;
  className?: string;
};

export function PartnerCard({ partner, className }: PartnerCardProps) {
  return (
    <BaseCard className={className}>
      <div className="group">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={400}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="card-title mb-2">{partner.name}</h3>
          <p className="mb-4 text-base-content/70">{partner.description}</p>

          <div className="mb-4 space-y-2">
            {partner.type === "academic" ? (
              <div className="text-sm text-base-content/60">
                <span className="font-medium">Khu vực:</span>{" "}
                {partner.details.region}
              </div>
            ) : (
              <>
                <div className="text-sm text-base-content/60">
                  <span className="font-medium">Ngành nghề:</span>{" "}
                  {partner.details.industry}
                </div>
                <div className="text-sm text-base-content/60">
                  <span className="font-medium">Hình thức hợp tác:</span>{" "}
                  {partner.details.cooperationType}
                </div>
                {partner.details.internshipInfo && (
                  <div className="text-sm text-base-content/60">
                    <span className="font-medium">Cơ hội thực tập:</span>{" "}
                    {partner.details.internshipInfo}
                  </div>
                )}
              </>
            )}
          </div>

          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="link-primary inline-flex items-center"
          >
            Xem thêm
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </BaseCard>
  );
}
