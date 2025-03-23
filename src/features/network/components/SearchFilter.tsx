"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { School } from "@/types/wordpress";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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

  const updateURLWithSchool = useCallback(
    (schoolId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (schoolId === "all") {
        params.delete("school");
      } else {
        const school = schools.find(
          (s) => s.databaseId.toString() === schoolId
        );
        if (school?.slug) {
          params.set("school", school.slug.toUpperCase());
        }
      }
      router.replace(`/network?${params.toString()}`);
      onSchoolChange(schoolId);
    },
    [router, searchParams, schools, onSchoolChange]
  );

  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`}>
      <Input
        placeholder="Tìm kiếm câu lạc bộ..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select onValueChange={updateURLWithSchool}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn trường/viện" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          {schools.map((school) => (
            <SelectItem key={school.id} value={school.databaseId.toString()}>
              <div className="flex justify-between items-center gap-2">
                <span>{school.name}</span>
                {school.slug && (
                  <span className="text-xs font-mono text-slate-500">
                    {school.slug.toUpperCase()}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
