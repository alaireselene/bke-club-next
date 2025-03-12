"use client";

import Link from "next/link";
import {
  Users,
  Atom,
  Beaker,
  Microscope,
  Rocket,
  Zap,
  Lightbulb,
  Compass,
  BookOpen,
  Brain,
} from "lucide-react";
import { BaseCard } from "@/app/components/ui";
import type { School, Club } from "@/db/schema";

interface SchoolCardProps {
  school: School;
  clubs: Club[];
  className?: string;
}

// Array of scientific icons to randomly assign to clubs
const CLUB_ICONS = [
  Atom,
  Beaker,
  Microscope,
  Rocket,
  BookOpen,
  Zap,
  Lightbulb,
  Compass,
  Brain,
];

// Function to get a consistent icon for a club based on its ID
const getClubIcon = (clubId: number) => {
  const iconIndex = clubId % CLUB_ICONS.length;
  return CLUB_ICONS[iconIndex];
};

// Function to generate a gradient based on school slug
const getSchoolGradient = (slug: string) => {
  const gradients = [
    "from-cardinal-600 to-cardinal-500",
    "from-navy-600 to-navy-500",
    "from-sunflower-500 to-tangerine-500",
    "from-cardinal-500 to-navy-600",
    "from-navy-500 to-sunflower-500",
  ];

  // Use the first character of the slug to determine a consistent gradient
  const charCode = slug.charCodeAt(0);
  return gradients[charCode % gradients.length];
};

export function SchoolCard({ school, clubs, className = "" }: SchoolCardProps) {
  const schoolGradient = getSchoolGradient(school.slug);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200/60 ${className}`}
    >
      {/* School header with gradient background */}
      <div
        className={`bg-gradient-to-r ${schoolGradient} p-6 text-white relative overflow-hidden`}
      >
        {/* Scientific pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
        <div className="absolute right-0 top-0 h-32 w-32 bg-white/10 rounded-bl-full"></div>

        {/* School info */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold">
              {school.slug.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold">{school.name}</h2>
          </div>

          <div className="flex items-center text-white/80 text-sm">
            <Users className="mr-1 h-4 w-4" />
            <span>{clubs.length} câu lạc bộ</span>
            <span className="mx-2">•</span>
            <span>
              {clubs.reduce((sum, club) => sum + (club.memberCount || 0), 0)}{" "}
              thành viên
            </span>
          </div>
        </div>
      </div>

      {/* Clubs grid with hexagonal pattern background */}
      <div className="p-6 relative">
        {/* Hexagonal pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="hexagons"
              width="50"
              height="43.4"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M25 0 L50 14.4 L50 38.6 L25 53 L0 38.6 L0 14.4 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Clubs grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative">
          {clubs.map((club) => {
            const ClubIcon = getClubIcon(club.id);
            return (
              <Link
                key={club.id}
                href={`/network/${club.slug}`}
                className="group"
              >
                <BaseCard
                  variant="scientific"
                  hover="lift"
                  rounded="lg"
                  shadow="md"
                  className="h-full transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    {/* Club icon with gradient background */}
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br ${schoolGradient} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <ClubIcon className="h-5 w-5" />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-cardinal-600 transition-colors duration-300">
                        {club.name}
                      </h3>
                      <div className="flex items-center text-sm text-slate-500">
                        <Users className="mr-1 h-4 w-4" />
                        <span>{club.memberCount ?? 0} thành viên</span>
                      </div>
                    </div>
                  </div>
                </BaseCard>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
