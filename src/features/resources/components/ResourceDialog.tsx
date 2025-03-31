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
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: resource.content }}
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
