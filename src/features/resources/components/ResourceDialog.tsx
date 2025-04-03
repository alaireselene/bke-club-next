"use client";

import { ResourceDialogProps } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Use for description if not HTML
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Import Shadcn Dialog components
import { Button } from "@/components/ui/button"; // Import Button
import { Download } from "lucide-react"; // Import Download icon

export const ResourceDialog = ({
  resource,
  isOpen,
  onClose,
}: ResourceDialogProps) => {
  // No need to check isOpen here, Dialog handles it via the 'open' prop

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]"> {/* Slightly wider dialog */}
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{resource.title}</DialogTitle> {/* Adjusted size */}
          {/* If description is plain text, use DialogDescription */}
          {/* <DialogDescription>Optional plain text description here</DialogDescription> */}
        </DialogHeader>

        {/* Display description if it exists, assuming it might contain HTML */}
        {resource.description && (
          <div className="py-4 max-h-[60vh] overflow-y-auto"> {/* Added max height and scroll */}
            <div
              className="prose prose-sm sm:prose-base max-w-none prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-strong:text-foreground dark:prose-invert" /* Adjusted prose styles */
              dangerouslySetInnerHTML={{ __html: resource.description }}
            />
          </div>
        )}

        <DialogFooter className="sm:justify-start gap-2"> {/* Align buttons left on small screens */}
          {/* Add download button if attachment exists */}
          {resource.attachment && (
            <Button asChild size="sm" variant="default">
              <a
                href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000"}/assets/${resource.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Tải xuống
              </a>
            </Button>
          )}
          {/* Use DialogClose for default closing behavior */}
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm"> {/* Changed variant */}
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
