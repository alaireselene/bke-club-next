"use client";

import { Building2, MapPin } from "lucide-react";
import { FacilityDialogProps } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Can be used for location/status
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Import Shadcn Dialog components
import { Button } from "@/components/ui/button"; // Import Button
import { cn } from "@/lib/utils"; // Import cn

export const FacilityDialog = ({
  facility,
  isOpen,
  onClose,
}: FacilityDialogProps) => {
  // No need to check isOpen here, Dialog handles it via the 'open' prop

  const statusText =
    facility.status === "working" // Use facility.status
      ? "Đang hoạt động"
      : "Đang xây dựng"; // Default to pending text
  const statusColor =
    facility.status === "working" // Use facility.status
      ? "bg-success/10 text-success" // Use theme colors
      : "bg-warning/10 text-warning"; // Use theme colors

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl"> {/* Adjusted size */}
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            {facility.name} {/* Use facility.name */}
          </DialogTitle>
          {/* Use DialogDescription for secondary info */}
          <DialogDescription className="pt-2 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"> {/* Use theme color */}
              <MapPin className="w-4 h-4" />
              <span>{facility.location}</span> {/* Use facility.location */}
            </div>
            <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", statusColor)}>
              {statusText}
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Display description if it exists */}
        {facility.description && (
          <div className="py-4">
            <div
              className="prose prose-sm sm:prose-base max-w-none prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-strong:text-foreground dark:prose-invert" /* Adjusted prose styles */
              dangerouslySetInnerHTML={{ __html: facility.description }}
            />
          </div>
        )}

        <DialogFooter>
          {/* Use DialogClose for default closing behavior */}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
