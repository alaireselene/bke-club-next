"use client";

import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResourceCardProps } from "../types";

/**
 * ResourceCard - Responsive, modern card for resource display.
 *
 * Usage:
 * <ResourceCard resource={resource} onOpen={onOpen} />
 *
 * - Prominent icon and bold, responsive resource title
 * - Modern hover/focus effects
 * - Download button as a clear CTA
 */
export const ResourceCard = ({ resource, onOpen }: ResourceCardProps) => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  return (
    <Card
      className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
      onClick={() => onOpen(resource)}
      tabIndex={0}
    >
      <CardContent className="flex flex-col gap-4 flex-grow p-6 sm:p-8 justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {resource.title}
          </h2>
        </div>
        {resource.attachment && (
          <Button
            asChild
            size="sm"
            variant="default"
            className="mt-4 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={`${directusUrl}/assets/${resource.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <Download className="mr-2 h-4 w-4" />
              Tải xuống
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
