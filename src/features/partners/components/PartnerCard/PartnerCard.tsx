"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import type { PartnerCardProps } from "./types";

export function PartnerCard({ partner, className }: PartnerCardProps) {
  return (
    <Card className={className}>
      <div className="group">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={
              partner.featuredImage?.node.sourceUrl ||
              "https://placehold.co/600x400.png"
            }
            alt={`${partner.title} logo`}
            width={400}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{partner.title}</h3>
          <p className="mb-4 text-base-content/70">{partner.content}</p>

          <a
            href={partner.partnerData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="link-primary inline-flex items-center"
          >
            Xem thêm
            <ChevronRight className="h-4 w-4" />
          </a>
        </CardContent>
      </div>
    </Card>
  );
}
