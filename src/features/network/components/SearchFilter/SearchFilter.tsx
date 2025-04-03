"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchFilterProps } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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
          (s) => s.id.toString() === schoolId // Use id
        );
        if (school?.slug) {
          // Use lowercase slug to match generateStaticParams and NetworkContent
          params.set("school", school.slug.toLowerCase());
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
            <SelectItem
              key={school.id} // Use id
              value={school.id.toString()} // Use id
            >
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
