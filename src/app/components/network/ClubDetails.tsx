"use client";

import type { Club } from "@/types/wordpress";
import {
  CalendarHeart,
  FlagTriangleRight,
  User as UserIcon,
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Atom,
  Rocket,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SchoolBasicInfo {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

interface ClubDetailsProps {
  club: Club;
  school: SchoolBasicInfo | null;
  className?: string;
}

export function ClubDetails({
  club,
  school,
  className = "",
}: ClubDetailsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const establishedYear = club.clubData?.establishedYear || "Chưa có";
  const presidentName = club.clubData?.president?.presidentName || "Chưa có";
  const membersCount = club.clubData?.membersCount || 0;
  const advisorNames =
    club.clubData?.advisors && club.clubData.advisors.length > 0
      ? club.clubData.advisors
          .map((a) => a.advisorName)
          .filter(Boolean)
          .join(", ")
      : "Chưa có";

  // Animation effect on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate a gradient based on club id
  const getClubGradient = () => {
    const gradients = [
      "from-cardinal-600 to-cardinal-500",
      "from-navy-600 to-navy-500",
      "from-sunflower-500 to-tangerine-500",
      "from-cardinal-500 to-navy-600",
      "from-navy-500 to-sunflower-500",
    ];

    return gradients[club.databaseId % gradients.length];
  };

  const clubGradient = getClubGradient();

  return (
    <div className={`${className}`}>
      {/* Club Header */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${clubGradient} text-white p-8 mb-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Scientific pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
        <div className="absolute right-0 top-0 h-64 w-64 bg-white/10 rounded-bl-full"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full border border-dashed border-white/20 opacity-60"></div>
        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full border border-dashed border-white/20 opacity-60"></div>

        <div className="relative z-10">
          {/* School badge */}
          {school && (
            <div className="mb-4 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="font-mono text-xs font-bold">
                {school.slug.toUpperCase()}
              </span>
              <span className="mx-2">•</span>
              <span className="text-sm">{school.name}</span>
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{club.title}</h1>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>
                <span className="font-semibold">
                  {club.clubData.membersCount}
                </span>{" "}
                thành viên
              </span>
            </div>

            <div className="flex items-center">
              <CalendarHeart className="h-5 w-5 mr-2" />
              <span>
                Thành lập năm{" "}
                <span className="font-semibold">{establishedYear}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid - optimized for two sections */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Leadership Section - takes 4/12 columns on large screens */}
        <div
          className={`lg:col-span-4 bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden transition-all duration-700 delay-300 h-fit ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-cardinal-500" />
              Ban điều hành
            </h3>

            <div className="space-y-6">
              {/* President */}
              <div className="flex">
                <div className="w-1 mr-5 bg-gradient-to-b from-cardinal-500 to-cardinal-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center">
                    <FlagTriangleRight className="h-5 w-5 text-cardinal-500" />
                    <span className="ml-2 font-semibold">Chủ nhiệm</span>
                  </div>
                  <div className="text-slate-600">{presidentName}</div>
                </div>
              </div>

              {/* Advisors */}
              <div className="flex">
                <div className="w-1 mr-5 bg-gradient-to-b from-navy-500 to-navy-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center">
                    <GraduationCap className="h-5 w-5 text-navy-500" />
                    <span className="ml-2 font-semibold">Cố vấn</span>
                  </div>
                  <div className="text-slate-600">{advisorNames}</div>
                </div>
              </div>
            </div>

            {/* Stats in leadership card on mobile */}
            <div className="mt-8 pt-6 border-t border-slate-100 lg:hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center text-slate-600 mb-1">
                    <UserIcon className="h-4 w-4 mr-2 text-cardinal-500" />
                    <span className="text-sm">Thành viên</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">
                    {club.clubData.membersCount}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center text-slate-600 mb-1">
                    <CalendarHeart className="h-4 w-4 mr-2 text-cardinal-500" />
                    <span className="text-sm">Thành lập</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">
                    {establishedYear}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description - takes 8/12 columns on large screens */}
        <div
          className={`lg:col-span-8 bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-cardinal-500" />
              Giới thiệu
            </h3>

            <div className="prose prose-base max-w-none prose-headings:text-cardinal-700 prose-headings:font-semibold prose-p:text-slate-600 prose-a:text-cardinal-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-strong:text-cardinal-700 prose-ul:text-slate-600 prose-ol:text-slate-600">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: club.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
