"use client";

import { Calendar, MapPin, Users, Globe } from "lucide-react";
import { formatDatetime } from "@/lib/utils/date";
import type { EventMetadataBarProps } from "./types";

export function EventMetadataBar({
  startDate,
  endDate,
  location,
  isOnline,
}: EventMetadataBarProps) {
  return (
    <div className="grid gap-6 rounded-xl border border-base-200 bg-base-100 p-8 shadow-sm transition-shadow hover:shadow-md sm:grid-cols-3">
      <div className="flex items-start gap-3 text-base-content/70">
        <Calendar className="h-5 w-5 text-primary" />
        <div>
          <span className="font-medium">Thời gian</span>
          <br />
          {formatDatetime(startDate)} - {formatDatetime(endDate)}
        </div>
      </div>

      <div className="flex items-start gap-3 text-base-content/70">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <span className="font-medium">Địa điểm</span>
          <br />
          {location || "Chưa xác định"}
        </div>
      </div>

      <div className="flex items-start gap-3 text-base-content/70">
        {isOnline ? (
          <>
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium">Thể thức</span>
              <br />
              Trực tuyến
            </div>
          </>
        ) : (
          <>
            <Users className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium">Thể thức</span>
              <br />
              Trực tiếp
            </div>
          </>
        )}
      </div>
    </div>
  );
}
