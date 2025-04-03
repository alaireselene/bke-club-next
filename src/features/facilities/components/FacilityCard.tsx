"use client";

import { Building2, MapPin } from "lucide-react";
import { FacilityCardProps } from "../types";

export const FacilityCard = ({ facility, onOpen }: FacilityCardProps) => {
  const statusText =
    facility.status === "working" // Use facility.status
      ? "Đang hoạt động"
      : "Đang xây dựng"; // Default to pending text if status is not 'working' or is null/undefined
  const statusColor =
    facility.status === "working" // Use facility.status
      ? "badge-success"
      : "badge-warning"; // Default to pending color

  return (
    <div
      className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={() => onOpen(facility)}
    >
      <div className="card-body">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h2 className="card-title text-lg">{facility.name}</h2> {/* Use facility.name */}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{facility.location}</span> {/* Use facility.location */}
        </div>
        <div className={`badge ${statusColor}`}>{statusText}</div>
      </div>
    </div>
  );
};
