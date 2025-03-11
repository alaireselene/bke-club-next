"use client";

import { useState, useMemo } from "react";
import { School, Club } from "@/db/schema";
import { SearchFilter } from "@/app/components/network/SearchFilter";
import { SchoolCard } from "@/app/components/network/SchoolCard";

interface NetworkContentProps {
  initialSchools: School[];
  initialClubsBySchool: Record<number, Club[]>;
  initialSchoolFilter?: string;
}

export function NetworkContent({
  initialSchools,
  initialClubsBySchool,
  initialSchoolFilter,
}: NetworkContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(
    initialSchoolFilter
      ? initialSchools
          .find((s) => s.slug.toUpperCase() === initialSchoolFilter)
          ?.id.toString()
      : ""
  );

  // Filter schools based on search query and selected school
  const filteredSchools = useMemo(() => {
    return initialSchools.filter((school) => {
      const matchesSchool =
        !selectedSchoolId || school.id.toString() === selectedSchoolId;
      const matchesSearch =
        searchQuery === "" ||
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (initialClubsBySchool[school.id] || []).some((club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesSchool && matchesSearch;
    });
  }, [initialSchools, initialClubsBySchool, selectedSchoolId, searchQuery]);

  return (
    <>
      <SearchFilter
        schools={initialSchools}
        onSearch={setSearchQuery}
        onSchoolChange={setSelectedSchoolId}
        className="mb-6"
      />

      <div className="grid gap-8">
        {filteredSchools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            clubs={initialClubsBySchool[school.id] || []}
          />
        ))}

        {filteredSchools.length === 0 && (
          <div className="text-center text-base-content/60 py-8">
            Không tìm thấy câu lạc bộ nào phù hợp với tìm kiếm của bạn.
          </div>
        )}
      </div>
    </>
  );
}
