"use client";

import { School, Club, User } from "@/db/schema";
import {
  CalendarHeart,
  FlagTriangleRight,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";

interface Leadership {
  president: User | null;
  advisors: User[];
}

interface ClubDetailsProps {
  club: Club;
  school: School | null;
  leadership: Leadership;
  className?: string;
}

export function ClubDetails({
  club,
  school,
  leadership,
  className = "",
}: ClubDetailsProps) {
  const establishedYear = new Date(club.establishedAt).getFullYear();
  const presidentName = leadership?.president?.fullName || "Chưa có";
  const advisorNames =
    leadership?.advisors?.length > 0
      ? leadership.advisors
          .map((a) => a?.fullName)
          .filter(Boolean)
          .join(", ")
      : "Chưa có";

  return (
    <div className={`card bg-base-100 shadow-md ${className}`}>
      <div className="card-body">
        {/* School badge */}
        {school && (
          <div className="mb-6">
            <span className="badge badge-accent font-mono">
              {school.slug.toUpperCase()}
            </span>
            <span className="ml-2 text-base-content/70">{school.name}</span>
          </div>
        )}

        {/* Leadership Section */}
        <div className="card bg-base-200 mb-8">
          <div className="card-body">
            <h3 className="card-title mb-6">Ban điều hành</h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* President */}
              <div>
                <div className="mb-2 flex items-center">
                  <FlagTriangleRight className="h-5 w-5 text-primary" />
                  <span className="ml-2 font-semibold">Chủ nhiệm</span>
                </div>
                <div className="ml-7 text-base-content/70">{presidentName}</div>
              </div>

              {/* Advisors */}
              <div>
                <div className="mb-2 flex items-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="ml-2 font-semibold">Cố vấn</span>
                </div>
                <div className="ml-7 text-base-content/70">{advisorNames}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 flex items-center space-x-8">
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-primary" />
            <span className="ml-2">
              <span className="font-semibold">{club.memberCount || 0}</span>{" "}
              thành viên
            </span>
          </div>

          <div className="flex items-center">
            <CalendarHeart className="h-5 w-5 text-primary" />
            <span className="ml-2">
              Thành lập năm{" "}
              <span className="font-semibold">{establishedYear}</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-base max-w-none">
          <div dangerouslySetInnerHTML={{ __html: club.description }} />
        </div>
      </div>
    </div>
  );
}
