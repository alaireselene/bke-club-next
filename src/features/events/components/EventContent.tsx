"use client";

import { AlertTriangle } from "lucide-react";

interface EventContentProps {
  content: string;
  isAiTranslated?: boolean;
}

export function EventContent({ content, isAiTranslated }: EventContentProps) {
  return (
    <div className="space-y-12 lg:col-span-2">
      {/* Event Content */}
      <div
        className="prose prose-base prose-slate dark:prose-invert dark:prose-headings:text-white dark:prose-a:text-primary dark:hover:prose-a:text-primary-focus dark:prose-strong:text-white max-w-none"
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />

      {isAiTranslated && (
        <div className="alert alert-warning rounded-lg">
          <div>
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>
              Nội dung được tự động dịch bởi AI, chỉ mang tính tham khảo.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
