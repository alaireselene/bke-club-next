"use client";

import type { ClubDetailsProps } from "./types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils"; // Import cn

import {
  CalendarHeart,
  FlagTriangleRight,
  User as UserIcon,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
// Removed: import { useEffect, useState } from "react"; // No longer needed for animation

export function ClubDetails({
  club,
  school,
  className = "",
}: ClubDetailsProps) {
  // Extract year from establishedYear string (which could be a full date)
  // Use Directus fields
  const establishedYear = club.established_date
    ? new Date(club.established_date).getFullYear().toString() // Assuming established_date is a full datetime string
    : "Chưa có";
  const presidentName = club.president_name || "Chưa có";
  const membersCount = club.members_count ?? 0; // Use nullish coalescing for 0 members

  // Parse advisors JSON (assuming it's an array of objects like { advisorName: string, advisorEmail?: string })
  let advisorNames = "Chưa có";
  try {
    const parsedAdvisors = typeof club.advisors === 'string'
      ? JSON.parse(club.advisors)
      : club.advisors; // Assume it might already be parsed

    if (Array.isArray(parsedAdvisors) && parsedAdvisors.length > 0) {
      // Adapt based on the actual structure within the JSON
      advisorNames = parsedAdvisors
        .map((a: any) => a.advisorName) // Access the name property
        .filter(Boolean)
        .join(", ");
      if (!advisorNames) advisorNames = "Chưa có"; // Handle case where names might be empty strings
    }
  } catch (e) {
    console.error("Error parsing advisors JSON for club:", club.id, e);
    // Keep default "Chưa có"
  }

  // Generate a gradient based on club id
  const getClubGradient = () => {
    const gradients = [
      "from-primary to-primary/80", // Use theme primary
      "from-secondary to-secondary/80", // Use theme secondary
      "from-accent to-accent/80", // Use theme accent
      "from-primary to-secondary/80",
      "from-secondary to-accent/80",
      "from-accent to-primary/80",
    ];

    // Use club.id (number) for gradient calculation
    return gradients[club.id % gradients.length];
  };

  const clubGradient = getClubGradient();

  return (
    <div className={cn(className)}>
      {/* Club Header */}
      <div
        className={cn(
          `relative overflow-hidden rounded-lg bg-gradient-to-r p-6 sm:p-8 mb-8 text-primary-foreground animate-fade-in opacity-0`, // Use theme foreground for contrast, adjusted padding/rounding
          clubGradient
        )}
        style={{ animationDuration: '0.7s', animationFillMode: 'forwards' }}
      >
        {/* Scientific pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)] opacity-50"></div> {/* Adjusted opacity */}
        <div className="absolute right-0 top-0 h-64 w-64 bg-background/5 rounded-bl-full opacity-50"></div> {/* Use theme background */}

        {/* Decorative elements */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 h-20 w-20 rounded-full border border-dashed border-background/20 opacity-60"></div> {/* Adjusted position/color */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 h-32 w-32 rounded-full border border-dashed border-background/20 opacity-60"></div> {/* Adjusted position/color */}

        <div className="relative z-10">
          {/* School badge */}
          {school && (
            <div className="mb-4 inline-flex items-center bg-background/30 backdrop-blur-sm rounded-full px-3 py-1 text-foreground"> {/* Use theme colors */}
              <span className="font-mono text-xs font-bold">
                {school.slug.toUpperCase()}
              </span>
              <span className="mx-2">•</span>
              <span className="text-xs sm:text-sm">{school.name}</span> {/* Adjusted size */}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{club.name}</h1> {/* Use club.name, adjusted size */}

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base text-primary-foreground/90"> {/* Adjusted gap/size */}
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> {/* Adjusted size */}
              <span>
                <span className="font-semibold">{membersCount}</span> thành viên
              </span>
            </div>

            <div className="flex items-center">
              <CalendarHeart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> {/* Adjusted size */}
              <span>
                Thành lập năm{" "}
                <span className="font-semibold">{establishedYear}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid - optimized for two sections */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12"> {/* Adjusted gap */}
        {/* Leadership Section - takes 4/12 columns on large screens */}
        <Card
          className={cn(
            `lg:col-span-4 h-fit animate-fade-in opacity-0` // Use Card, h-fit
          )}
          style={{ animationDuration: '0.7s', animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl"> {/* Adjusted size */}
              <Award className="h-5 w-5 mr-2 text-primary" /> {/* Use theme color */}
              Ban điều hành
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5"> {/* Adjusted spacing */}
            {/* President */}
            <div className="flex">
              <div className="w-1 mr-4 sm:mr-5 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div> {/* Use theme color */}
              <div className="flex-1">
                <div className="mb-1 flex items-center"> {/* Adjusted margin */}
                  <FlagTriangleRight className="h-5 w-5 text-primary" /> {/* Use theme color */}
                  <span className="ml-2 font-semibold text-sm sm:text-base">Chủ nhiệm</span> {/* Adjusted size */}
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">{presidentName}</div> {/* Use theme color, adjusted size */}
              </div>
            </div>

            {/* Advisors */}
            <div className="flex">
              <div className="w-1 mr-4 sm:mr-5 bg-gradient-to-b from-secondary to-secondary/60 rounded-full"></div> {/* Use theme color */}
              <div className="flex-1">
                <div className="mb-1 flex items-center"> {/* Adjusted margin */}
                  <GraduationCap className="h-5 w-5 text-secondary" /> {/* Use theme color */}
                  <span className="ml-2 font-semibold text-sm sm:text-base">Mentor</span> {/* Adjusted size */}
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">{advisorNames}</div> {/* Use theme color, adjusted size */}
              </div>
            </div>
          </CardContent>
          {/* Removed redundant mobile stats block */}
        </Card>

        {/* Description - takes 8/12 columns on large screens */}
        <Card
          className={cn(
            `lg:col-span-8 animate-fade-in opacity-0` // Use Card
          )}
          style={{ animationDuration: '0.7s', animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl"> {/* Adjusted size */}
              <BookOpen className="h-5 w-5 mr-2 text-primary" /> {/* Use theme color */}
              Giới thiệu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-base max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground dark:prose-invert"> {/* Adjusted prose colors */}
              {/* Use club.description, assuming HTML */}
              {club.description ? (
                <div dangerouslySetInnerHTML={{ __html: club.description }} /> // Removed extra prose class here
              ) : (
                <p className="text-muted-foreground">Chưa có nội dung giới thiệu.</p> // Use theme color
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
