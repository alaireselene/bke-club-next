"use client";

import { Building2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import { cn } from "@/lib/utils"; // Import cn
import { FacilityCardProps } from "../types";

export const FacilityCard = ({ facility, onOpen }: FacilityCardProps) => {
  const statusText =
    facility.status === "working" // Use facility.status
      ? "Đang hoạt động"
      : "Đang xây dựng"; // Default to pending text if status is not 'working' or is null/undefined
  const statusColor =
    facility.status === "working" // Use facility.status
      ? "bg-success/10 text-success" // Use theme colors
      : "bg-warning/10 text-warning"; // Use theme colors

  return (
    <Card
      className="interactive-hover cursor-pointer h-full flex flex-col" // Use Card, add hover, ensure flex column
      onClick={() => onOpen(facility)}
    >
      <CardContent className="p-4 sm:p-6 space-y-3 flex-grow"> {/* Use CardContent, adjust padding/spacing, add flex-grow */}
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">{facility.name}</h2> {/* Adjusted size */}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"> {/* Use theme color */}
          <MapPin className="w-4 h-4" />
          <span>{facility.location}</span> {/* Use facility.location */}
        </div>
        {/* Replaced DaisyUI badge with themed div */}
        <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", statusColor)}>
          {statusText}
        </div>
      </CardContent>
    </Card>
  );
};
