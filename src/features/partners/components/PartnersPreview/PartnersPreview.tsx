"use client";

// Removed: import { motion } from "motion/react";
// Removed: import { PartnerCard } from "../PartnerCard/PartnerCard";
import type { PartnersPreviewProps } from "./types";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button
import Image from "next/image"; // Import Next Image

export function PartnersPreview({ partners }: PartnersPreviewProps) {
  // Filter logic might need adjustment based on actual data structure
  // Filter partners that have a logo and construct the image URL
  const partnersWithLogos = partners
    .filter((partner) => partner.logo)
    .map((partner) => ({
      ...partner,
      logoUrl: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${partner.logo}`,
    }));

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden"> {/* Adjusted padding */}
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-70"> {/* Added opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background"></div> {/* Use theme colors */}

        {/* Hexagon Grid Pattern */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-[0.03] text-foreground" // Use theme color
        >
          <defs>
            <pattern
              id="hexagon-pattern"
              x="0"
              y="0"
              width="50"
              height="44"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(30)"
            >
              <path
                d="M25,0 L50,14.433756729740645 L50,43.30127018922193 L25,57.735026918962575 L0,43.30127018922193 L0,14.433756729740645 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
        </svg>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-secondary/5 to-transparent"></div> {/* Use theme colors */}
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-br from-primary/5 to-transparent"></div> {/* Use theme colors */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-12 sm:mb-16 animate-fade-in opacity-0" // Adjusted margin
          style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}
        >
          <div
            className="inline-flex items-center justify-center px-3 py-1.5 mb-4 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium transition-transform hover:scale-105" // Use theme accent color
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2 animate-pulse" style={{ animationDuration: '2s' }}></span>
            Đối tác
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-fade-in opacity-0" // Adjusted size & color
            style={{ animationDuration: '0.6s', animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Đơn vị đồng hành
          </h2>

          <p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" // Adjusted size & color
            style={{ animationDuration: '0.6s', animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            Kết nối và phát triển cùng các đối tác chiến lược
          </p>
        </div>

        {/* Partners Grid */}
        {/* Partners Logo Scroll */}
        {partnersWithLogos.length > 0 ? (
          <div className="relative mt-8 sm:mt-12"> {/* Added margin top */}
            {/* Fade effect for edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            {/* Auto-Scrolling container */}
            {/* Outer div masks the overflow */}
            <div className="overflow-hidden">
              {/* Inner div contains duplicated logos and applies animation */}
              {/* Added flex-nowrap and w-max to ensure container width includes all duplicated logos */}
              <div className="flex flex-nowrap w-max animate-scroll space-x-12 sm:space-x-16 py-4 hover:pause-animation">
                {/* Duplicate logos for seamless loop */}
                {[...partnersWithLogos, ...partnersWithLogos].map((partner, index) => (
                  <div
                    // Use a unique key combining id and index for duplicates
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0" // Removed fade-in animation for smoother scroll
                  >
                    <a
                      href={partner.website_url || '#'} // Link to partner website if available
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-transform hover:scale-105" // Keep hover scale
                      title={partner.name} // Add partner name as title
                    >
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        width={120} // Adjust width as needed
                        height={60} // Adjust height as needed
                        // Removed grayscale, kept object-contain and transitions
                        className="h-12 sm:h-16 w-auto object-contain transition-transform duration-300"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border animate-fade-in opacity-0" // Use theme colors/border
            style={{ animationDuration: '0.4s', animationFillMode: 'forwards' }}
          >
            <div className="text-4xl sm:text-5xl mb-4">🤝</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Chưa có đối tác nào.</p> {/* Adjusted size */}
          </div>
        )}

        {/* Join Us Button */}
        <div
          className="mt-12 sm:mt-16 text-center animate-fade-in opacity-0" // Adjusted margin
          style={{ animationDuration: '0.6s', animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          {/* Replaced custom Link with standard Button */}
          <Link href="/contact" passHref>
             <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-content transition-transform hover:scale-105"> {/* Use Accent color */}
               Trở thành đối tác
             </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
