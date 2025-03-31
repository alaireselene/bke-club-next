"use client";

import { Building2, MapPin } from "lucide-react";
import { FacilityCardProps } from "../types";

export const FacilityCard = ({ facility, onOpen }: FacilityCardProps) => {
  const statusText =
    facility.facilityData.status === "working"
      ? "Đang hoạt động"
      : "Đang xây dựng";
  const statusColor =
    facility.facilityData.status === "working"
      ? "badge-success"
      : "badge-warning";

  return (
    <div
      className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={() => onOpen(facility)}
    >
      <div className="card-body">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h2 className="card-title text-lg">{facility.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{facility.facilityData.location}</span>
        </div>
        <div className={`badge ${statusColor}`}>{statusText}</div>
      </div>
    </div>
  );
};
