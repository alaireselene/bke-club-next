"use client";

import { Building2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FacilityCardProps } from "../types";

/**
 * FacilityCard - Responsive, modern card for facility display.
 *
 * Usage:
 * <FacilityCard facility={facility} onOpen={onOpen} />
 *
 * - Prominent icon and bold, responsive facility name
 * - Modern hover/focus effects
 * - Status badge as a modern chip
 */
export const FacilityCard = ({ facility, onOpen }: FacilityCardProps) => {
  const statusText =
    facility.status === "working"
      ? "Đang hoạt động"
      : "Đang xây dựng";
  const statusColor =
    facility.status === "working"
      ? "bg-success/10 text-success"
      : "bg-warning/10 text-warning";

  return (
    <Card
      className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
      onClick={() => onOpen(facility)}
      tabIndex={0}
    >
      <CardContent className="flex flex-col gap-4 flex-grow p-6 sm:p-8 justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-7 h-7 text-primary shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {facility.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{facility.location}</span>
        </div>
        <div className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mt-2 w-fit", statusColor)}>
          {statusText}
        </div>
      </CardContent>
    </Card>
  );
};
