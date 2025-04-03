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
        {/* Removed hardcoded badge */}
        {/* Conditionally render download button if attachment exists */}
        {resource.attachment && (
          <div className="card-actions justify-end mt-4">
            <a
              href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000"}/assets/${resource.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
            >
              Tải xuống
            </a>
          </div>
        )}
        </div>
      </div>
  );
};
