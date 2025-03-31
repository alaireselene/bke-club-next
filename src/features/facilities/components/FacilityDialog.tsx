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
    facility.facilityData.status === "working"
      ? "Đang hoạt động"
      : "Đang xây dựng";
  const statusColor =
    facility.facilityData.status === "working"
      ? "badge-success"
      : "badge-warning";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg">{facility.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{facility.facilityData.location}</span>
        </div>
        <div className={`badge ${statusColor} mb-4`}>{statusText}</div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: facility.content }}
        />
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
