"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import type { PartnerCardProps } from "./types";

export function PartnerCard({ partner, className }: PartnerCardProps) {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  const logoUrl = partner.logo
    ? `${directusUrl}/assets/${partner.logo}` // Append format parameter
    : "https://placehold.co/600x400.png"; // Placeholder if no logo

  return (
    <Card className={className}>
      <div className="group">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={logoUrl}
            alt={`${partner.name} logo`} // Use partner.name
            width={400}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{partner.name}</h3> {/* Use partner.name */}
          {/* Removed partner.content as it doesn't exist in Directus schema */}

          {partner.website_url && ( // Check if website_url exists
            <a
              href={partner.website_url} // Use partner.website_url
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary inline-flex items-center"
            >
              Xem thêm
              <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
