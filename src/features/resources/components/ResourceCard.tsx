"use client";

import { FileText, Download } from "lucide-react"; // Added Download icon
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import { Button } from "@/components/ui/button"; // Import Button
import { cn } from "@/lib/utils"; // Import cn
import { ResourceCardProps } from "../types";

export const ResourceCard = ({ resource, onOpen }: ResourceCardProps) => {
  return (
    <Card
      className="interactive-hover cursor-pointer h-full flex flex-col" // Use Card, add hover, ensure flex column
      onClick={() => onOpen(resource)}
    >
      <CardContent className="p-4 sm:p-6 flex-grow flex flex-col justify-between"> {/* Use CardContent, adjust padding, add flex */}
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">{resource.title}</h2> {/* Adjusted size */}
        </div>
        {/* Removed hardcoded badge */}
        {/* Conditionally render download button if attachment exists */}
        {resource.attachment && (
          <div className="card-actions justify-end mt-4">
            {/* Replaced anchor with Button */}
            <Button
              asChild // Use asChild to wrap the anchor tag for proper link behavior
              size="sm"
              variant="default"
              className="mt-4"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
            >
              <a
                href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000"}/assets/${resource.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" /> {/* Added icon */}
                Tải xuống
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
