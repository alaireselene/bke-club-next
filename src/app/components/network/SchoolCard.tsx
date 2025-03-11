"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { BaseCard } from "@/app/components/ui";
import type { School, Club } from "@/db/schema";

interface SchoolCardProps {
  school: School;
  clubs: Club[];
  className?: string;
}

export function SchoolCard({ school, clubs, className = "" }: SchoolCardProps) {
  return (
    <div className={`card bg-base-100 shadow-md ${className}`}>
      <div className="card-body">
        <div className="mb-4">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <span className="badge badge-primary font-mono">
              {school.slug.toUpperCase()}
            </span>
            <span>{school.name}</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Link key={club.id} href={`/network/${club.slug}`}>
              <BaseCard
                background="bg-base-200"
                hover
                hoverScale
                shadow="shadow-sm"
                hoverShadow="hover:shadow-lg"
                padding="p-4"
              >
                <h3 className="mb-2 text-lg font-semibold">{club.name}</h3>
                <div className="flex items-center text-sm text-base-content/60">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{club.memberCount ?? 0} thành viên</span>
                </div>
              </BaseCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
