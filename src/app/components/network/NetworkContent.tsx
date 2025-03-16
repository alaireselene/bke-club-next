"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/app/components/network/SearchFilter";
import { SchoolCard } from "@/app/components/network/SchoolCard";
import type { School } from "@/types/wordpress";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  Network,
  Atom,
  Beaker,
  Microscope,
  Rocket,
} from "lucide-react";

interface NetworkContentProps {
  schools: School[];
  initialSchoolFilter?: string;
}

const SCIENTIFIC_ICONS = [Atom, Beaker, Microscope, Rocket, Network, Compass];

export function NetworkContent({
  schools,
  initialSchoolFilter,
}: NetworkContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(
    initialSchoolFilter && schools.length
      ? schools
          .find((s) => s.slug?.toUpperCase() === initialSchoolFilter)
          ?.databaseId.toString() ?? ""
      : ""
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = useSearchParams();

  // Watch for URL changes and update selected school
  useEffect(() => {
    const schoolParam = searchParams.get("school");
    if (schoolParam) {
      const matchedSchool = schools.find(
        (s) => s.slug?.toUpperCase() === schoolParam
      );
      if (matchedSchool) {
        setSelectedSchoolId(matchedSchool.databaseId.toString());
      }
    } else {
      setSelectedSchoolId("all");
    }
  }, [searchParams, schools]);

  // Animation effect on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter schools based on search query and selected school
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSchool =
        !selectedSchoolId ||
        selectedSchoolId === "all" ||
        school.databaseId.toString() === selectedSchoolId;
      const matchesSearch =
        (searchQuery === "" ||
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.clubs?.nodes.some((club) =>
            club.title.toLowerCase().includes(searchQuery.toLowerCase())
          )) ??
        false;

      return matchesSchool && matchesSearch;
    });
  }, [schools, selectedSchoolId, searchQuery]);

  // Calculate network stats
  const networkStats = useMemo(() => {
    return schools.reduce(
      (acc, school) => {
        const clubCount = school.clubs?.nodes?.length ?? 0;
        const memberCount =
          school.clubs?.nodes?.reduce(
            (sum, club) => sum + (club.clubData?.membersCount ?? 0),
            0
          ) ?? 0;

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
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full border border-dashed border-cardinal-200/40 opacity-60"></div>
        <div className="absolute bottom-40 right-10 h-60 w-60 rounded-full border border-dashed border-navy-200/40 opacity-60"></div>

        {/* Floating scientific icons */}
        {SCIENTIFIC_ICONS.map((Icon, index) => (
          <div
            key={index}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <Icon size={24 + Math.floor(Math.random() * 24)} />
          </div>
        ))}
      </div>

      {/* Network Stats */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cardinal-50 rounded-bl-full opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Trường/Khoa/Viện
            </h3>
            <p className="text-3xl font-bold text-slate-800">
              {schools.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-navy-50 rounded-bl-full opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Câu lạc bộ
            </h3>
            <p className="text-3xl font-bold text-slate-800">
              {networkStats.totalClubs}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sunflower-50 rounded-bl-full opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Thành viên
            </h3>
            <p className="text-3xl font-bold text-slate-800">
              {networkStats.totalMembers}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div
        className={`transition-all duration-700 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <SearchFilter
          schools={schools}
          onSearch={setSearchQuery}
          onSchoolChange={setSelectedSchoolId}
          className="mb-10"
        />
      </div>

      {/* Network Visualization - Decorative element */}
      <div className="relative mb-10 h-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-slate-200"></div>
        </div>
        <div className="relative flex justify-around">
          {filteredSchools.slice(0, 5).map((school, index) => (
            <div
              key={school.databaseId}
              className="bg-white h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center shadow-sm"
              style={{
                animation: `pulse 3s infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <span className="text-xs font-bold text-cardinal-600">
                {school.slug?.substring(0, 2).toUpperCase() || ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid gap-8">
        {filteredSchools.map((school, index) => (
          <div
            key={school.databaseId}
            className={`transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${300 + index * 150}ms` }}
          >
            <SchoolCard school={school} clubs={school.clubs?.nodes ?? []} />
          </div>
        ))}

        {filteredSchools.length === 0 && (
          <div className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
            <div className="text-5xl mb-4">🔍</div>
            <p>Không tìm thấy câu lạc bộ nào phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
