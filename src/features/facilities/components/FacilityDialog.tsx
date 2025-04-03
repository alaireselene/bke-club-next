"use client";

import { Building2, MapPin } from "lucide-react";
import { FacilityDialogProps } from "../types";

export const FacilityDialog = ({
  facility,
  isOpen,
  onClose,
}: FacilityDialogProps) => {
  if (!isOpen) return null;

  const statusText =
    facility.status === "working" // Use facility.status
      ? "Đang hoạt động"
      : "Đang xây dựng"; // Default to pending text
  const statusColor =
    facility.status === "working" // Use facility.status
      ? "badge-success"
      : "badge-warning"; // Default to pending color

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg">{facility.name}</h3> {/* Use facility.name */}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{facility.location}</span> {/* Use facility.location */}
        </div>
        <div className={`badge ${statusColor} mb-4`}>{statusText}</div>
        {/* Display description if it exists */}
        {facility.description && (
          <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: facility.description }} />
        )}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
