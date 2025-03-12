"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, ChevronDown } from "lucide-react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get initial school from URL
  const schoolParam = searchParams.get("school");
  const initialSchool = schools.find(
    (s) => s.slug.toUpperCase() === schoolParam
  );

  const [selectedSchool, setSelectedSchool] = useState<School | null>(
    initialSchool || null
  );

  useEffect(() => {
    // Update search results when query changes
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSchoolSelect = (school: School | null) => {
    setSelectedSchool(school);
    setIsDropdownOpen(false);

    const schoolId = school?.id.toString() || "";
    onSchoolChange(schoolId);

    // Update URL
    const url = new URL(window.location.href);
    if (schoolId && school) {
      url.searchParams.set("school", school.slug.toUpperCase());
    } else {
      url.searchParams.delete("school");
    }
    router.push(url.pathname + url.search);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-1 flex flex-col md:flex-row">
        {/* Search Input */}
        <div
          className={`relative flex-1 transition-all duration-300 ${
            isFocused ? "ring-2 ring-cardinal-200 rounded-xl" : ""
          }`}
        >
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm câu lạc bộ hoặc trường..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full py-3 pl-12 pr-10 rounded-xl bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* School Dropdown */}
        <div className="relative md:ml-2 mt-2 md:mt-0" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-between w-full md:w-auto px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors ${
              selectedSchool ? "text-slate-800" : "text-slate-500"
            }`}
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>
                {selectedSchool ? selectedSchool.name : "Tất cả trường"}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-full md:w-72 right-0 bg-white rounded-xl shadow-lg border border-slate-200/60 py-2 animate-fade-in">
              <div className="max-h-80 overflow-y-auto">
                <div
                  className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center"
                  onClick={() => handleSchoolSelect(null)}
                >
                  <span
                    className={`w-4 h-4 mr-2 rounded-full border ${
                      !selectedSchool
                        ? "bg-cardinal-500 border-cardinal-500"
                        : "border-slate-300"
                    }`}
                  >
                    {!selectedSchool && (
                      <span className="flex h-full w-full items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </span>
                  <span>Tất cả trường</span>
                </div>

                {schools.map((school) => (
                  <div
                    key={school.id}
                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center"
                    onClick={() => handleSchoolSelect(school)}
                  >
                    <span
                      className={`w-4 h-4 mr-2 rounded-full border ${
                        selectedSchool?.id === school.id
                          ? "bg-cardinal-500 border-cardinal-500"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedSchool?.id === school.id && (
                        <span className="flex h-full w-full items-center justify-center text-white text-xs">
                          ✓
                        </span>
                      )}
                    </span>
                    <span>{school.name}</span>
                    <span className="ml-2 text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                      {school.slug.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
