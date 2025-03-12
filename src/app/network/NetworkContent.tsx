"use client";

import { useState, useMemo, useEffect } from "react";
import { School, Club } from "@/db/schema";
import { SearchFilter } from "@/app/components/network/SearchFilter";
import { SchoolCard } from "@/app/components/network/SchoolCard";
import {
  Compass,
  Network,
  Atom,
  Beaker,
  Microscope,
  Rocket,
} from "lucide-react";

interface NetworkContentProps {
  initialSchools: School[];
  initialClubsBySchool: Record<number, Club[]>;
  initialSchoolFilter?: string;
}

// Scientific icons for visual interest
const SCIENTIFIC_ICONS = [Atom, Beaker, Microscope, Rocket, Network, Compass];

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  // Calculate total clubs for stats
  const totalClubs = useMemo(() => {
    return Object.values(initialClubsBySchool).reduce(
      (total, clubs) => total + clubs.length,
      0
    );
  }, [initialClubsBySchool]);

  // Calculate total members for stats
  const totalMembers = useMemo(() => {
    return Object.values(initialClubsBySchool).reduce(
      (total, clubs) =>
        total + clubs.reduce((sum, club) => sum + (club.memberCount || 0), 0),
      0
    );
  }, [initialClubsBySchool]);

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
              Trường/Viện
            </h3>
            <p className="text-3xl font-bold text-slate-800">
              {initialSchools.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-navy-50 rounded-bl-full opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Câu lạc bộ
            </h3>
            <p className="text-3xl font-bold text-slate-800">{totalClubs}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sunflower-50 rounded-bl-full opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Thành viên
            </h3>
            <p className="text-3xl font-bold text-slate-800">{totalMembers}</p>
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
          schools={initialSchools}
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
              key={school.id}
              className="bg-white h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center shadow-sm"
              style={{
                animation: `pulse 3s infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <span className="text-xs font-bold text-cardinal-600">
                {school.slug.substring(0, 2).toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid gap-8">
        {filteredSchools.map((school, index) => (
          <div
            key={school.id}
            className={`transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${300 + index * 150}ms` }}
          >
            <SchoolCard
              school={school}
              clubs={initialClubsBySchool[school.id] || []}
            />
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
