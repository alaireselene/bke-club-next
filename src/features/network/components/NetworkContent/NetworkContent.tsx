"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/features/network/components/SearchFilter/SearchFilter";
import { SchoolCard } from "@/features/network/components/SchoolCard/SchoolCard";
import type { NetworkContentProps } from "./types";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils"; // Import cn

import { useSearchParams } from "next/navigation";
// Removed unused icons: Compass, Network, Atom, Beaker, Microscope, Rocket

export function NetworkContent({
  schools,
  initialSchoolFilter,
}: NetworkContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(
    initialSchoolFilter && schools.length
      ? schools
          // Use lowercase slug for comparison, matching generateStaticParams
          .find((s) => s.slug?.toLowerCase() === initialSchoolFilter?.toLowerCase())
          ?.id.toString() ?? "" // Use id instead of databaseId
      : ""
  );
  // Removed: isLoaded state

  const searchParams = useSearchParams();

  // Watch for URL changes and update selected school
  useEffect(() => {
    const schoolParam = searchParams.get("school");
    if (schoolParam) {
      const matchedSchool = schools.find(
        // Use lowercase slug for comparison
        (s) => s.slug?.toLowerCase() === schoolParam?.toLowerCase()
      );
      if (matchedSchool) {
        setSelectedSchoolId(matchedSchool.id.toString()); // Use id
      }
    } else {
      setSelectedSchoolId("all"); // Default to 'all' if no param
    }
  }, [searchParams, schools]);

  // Removed: useEffect for isLoaded

  // Filter schools based on search query and selected school
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSchool =
        !selectedSchoolId ||
        selectedSchoolId === "all" ||
        school.id.toString() === selectedSchoolId; // Use id
      const matchesSearch =
        (searchQuery === "" ||
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // Iterate over school.clubs array and check club.name
          school.clubs.some((club) =>
            club.name.toLowerCase().includes(searchQuery.toLowerCase())
          )) ??
        false;

      return matchesSchool && matchesSearch;
    });
  }, [schools, selectedSchoolId, searchQuery]);

  // Calculate network stats
  const networkStats = useMemo(() => {
    return schools.reduce(
      (acc, school) => {
        const clubCount = school.clubs.length; // Use direct array length
        const memberCount =
          school.clubs.reduce(
            // Use club.members_count from Directus type
            (sum, club) => sum + (club.members_count ?? 0),
            0
          );

        return {
          totalClubs: acc.totalClubs + clubCount,
          totalMembers: acc.totalMembers + memberCount,
        };
      },
      { totalClubs: 0, totalMembers: 0 }
    );
  }, [schools]);

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-70"> {/* Added opacity */}
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full border border-dashed border-primary/20"></div> {/* Use theme color */}
        <div className="absolute bottom-40 right-10 h-60 w-60 rounded-full border border-dashed border-secondary/20"></div> {/* Use theme color */}
        {/* Removed floating icons */}
      </div>

      {/* Network Stats */}
      <div
        className={cn(
          `grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in opacity-0` // Use fade-in animation
        )}
        style={{ animationDuration: '0.7s', animationFillMode: 'forwards' }}
      >
        {/* Replaced custom divs with Card components */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-bl-full opacity-70"></div> {/* Use theme color */}
          <CardContent className="relative z-10 p-4 sm:p-6"> {/* Adjusted padding */}
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1"> {/* Use theme color, adjusted size */}
              Trường/Khoa/Viện
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-foreground"> {/* Use theme color, adjusted size */}
              {schools.length}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-secondary/10 rounded-bl-full opacity-70"></div> {/* Use theme color */}
          <CardContent className="relative z-10 p-4 sm:p-6"> {/* Adjusted padding */}
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1"> {/* Use theme color, adjusted size */}
              Câu lạc bộ
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-foreground"> {/* Use theme color, adjusted size */}
              {networkStats.totalClubs}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-accent/10 rounded-bl-full opacity-70"></div> {/* Use theme color */}
          <CardContent className="relative z-10 p-4 sm:p-6"> {/* Adjusted padding */}
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1"> {/* Use theme color, adjusted size */}
              Thành viên
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-foreground"> {/* Use theme color, adjusted size */}
              {networkStats.totalMembers}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div
        className={cn(
          `animate-fade-in opacity-0` // Use fade-in animation
        )}
        style={{ animationDuration: '0.7s', animationDelay: '0.3s', animationFillMode: 'forwards' }}
      >
        <SearchFilter
          schools={schools}
          onSearch={setSearchQuery}
          onSchoolChange={setSelectedSchoolId}
          className="mb-10"
        />
      </div>
      {/* Schools Grid */}
      <div className="grid gap-6 sm:gap-8"> {/* Adjusted gap */}
        {filteredSchools.map((school, index) => (
          <div
            key={school.id} // Use id
            className={cn(
              `animate-fade-in opacity-0` // Use fade-in animation
            )}
            style={{ animationDuration: '0.7s', animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }} // Stagger fade-in
          >
            {/* Pass school.clubs directly */}
            <SchoolCard school={school} clubs={school.clubs} />
          </div>
        ))}

        {filteredSchools.length === 0 && (
          <div className="text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border"> {/* Use theme colors/border */}
            <div className="text-4xl sm:text-5xl mb-4">🔍</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Không tìm thấy câu lạc bộ nào phù hợp với tìm kiếm của bạn.</p> {/* Adjusted size */}
          </div>
        )}
      </div>

      {/* Removed inline style block for animations */}
    </div>
  );
}
