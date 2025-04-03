"use client";

import { ResourceDialogProps } from "../types";

export const ResourceDialog = ({
  resource,
  isOpen,
  onClose,
}: ResourceDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{resource.title}</h3>
        {/* Display description if it exists, assuming it might contain HTML */}
        {resource.description && (
          <div
            className="prose max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: resource.description }}
          />
        )}
        {/* Add download button if attachment exists */}
        {resource.attachment && (
           <a
              href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000"}/assets/${resource.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mr-2" // Added margin-right
            >
              Tải xuống
            </a>
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
