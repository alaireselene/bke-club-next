"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PartnerCardProps } from "./types";

/**
 * PartnerCard - Responsive, modern card for partner display.
 *
 * Usage:
 * <PartnerCard partner={partner} />
 *
 * - Full-bleed, responsive logo image (aspect-[4/3])
 * - Responsive, bold partner name
 * - Modern hover/focus effects
 * - Clear call-to-action for website
 */
export function PartnerCard({ partner, className }: PartnerCardProps) {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  const logoUrl = partner.logo
    ? `${directusUrl}/assets/${partner.logo}`
    : "https://placehold.co/600x400.png";

  return (
    <Card className={cn("group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card", className)}>
      <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
        <Image
          src={logoUrl}
          alt={`${partner.name} logo`}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <CardContent className="flex flex-col gap-3 flex-grow p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {partner.name}
        </h3>
        {/* Website link as CTA */}
        {partner.website_url && (
          <a
            href={partner.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full transition group/link"
          >
            Xem thêm
            <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
