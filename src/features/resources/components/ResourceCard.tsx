"use client";

import { FileText } from "lucide-react";
import { ResourceCardProps } from "../types";

export const ResourceCard = ({ resource, onOpen }: ResourceCardProps) => {
  return (
    <div
      className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={() => onOpen(resource)}
    >
      <div className="card-body">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="card-title text-lg">{resource.title}</h2>
        </div>
        <div className="badge badge-primary">PDF</div>
        <div className="card-actions justify-end mt-4">
          <a
            href="https://libopac.hust.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
};
