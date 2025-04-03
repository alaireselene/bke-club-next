"use client";

import { AlertTriangle } from "lucide-react";
import type { EventContentProps } from "./types";

export function EventContent({ content, isAiTranslated }: EventContentProps) {
  return (
    <div className="space-y-12 lg:col-span-2">
      {/* Event Content */}
      <div
        className="prose prose-base prose-slate dark:prose-invert prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground max-w-none" // Simplified dark mode (handled by prose-invert), adjusted link hover, strong color
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />

      {isAiTranslated && (
        <div className="flex items-start gap-3 rounded-lg border border-warning bg-warning/10 p-4 text-sm text-warning-content" role="alert">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span className="flex-1">
            Nội dung được tự động dịch bởi AI, chỉ mang tính tham khảo.
          </span>
        </div>
      )}
    </div>
  );
}

