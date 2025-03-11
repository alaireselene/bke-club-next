"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { School } from "@/db/schema";

interface SearchFilterProps {
  schools: School[];
  onSearch: (query: string) => void;
  onSchoolChange: (schoolId: string) => void;
  className?: string;
}

export function SearchFilter({
  schools,
  onSearch,
  onSchoolChange,
  className = "",
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Get initial school from URL
  const schoolParam = searchParams.get("school");
  const initialSchool = schools.find(
    (s) => s.slug.toUpperCase() === schoolParam
  );

  useEffect(() => {
    // Update search results when query changes
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const schoolId = event.target.value;
    onSchoolChange(schoolId);

    // Update URL
    const url = new URL(window.location.href);
    if (schoolId) {
      const school = schools.find((s) => s.id.toString() === schoolId);
      if (school) {
        url.searchParams.set("school", school.slug.toUpperCase());
      }
    } else {
      url.searchParams.delete("school");
    }
    router.push(url.pathname + url.search);
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Tìm kiếm câu lạc bộ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
      </div>

      {/* School Select */}
      <select
        className="select select-bordered min-w-[200px]"
        value={initialSchool?.id.toString() ?? ""}
        onChange={handleSchoolChange}
      >
        <option value="">Tất cả trường</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id.toString()}>
            {school.name}
          </option>
        ))}
      </select>
    </div>
  );
}
