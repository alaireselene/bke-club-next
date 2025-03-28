import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import type { EventCardProps } from "./types";

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.eventData.eventTime.eventStartTime);
  const formattedDate =
    Number(startDate) !== 0
      ? new Intl.DateTimeFormat("vi-VN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(startDate)
      : "Đang cập nhật";

  return (
    <Link href={`/events/${event.slug}`} className="h-full">
      <Card className="group h-full transition hover:shadow-md">
        {event.featuredImage?.node.sourceUrl && (
          <div className="relative h-48 w-full overflow-hidden shrink-0">
            <Image
              src={event.featuredImage.node.sourceUrl}
              alt={event.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="space-y-4 p-6">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
            {event.title}
          </h3>
          {event.excerpt && (
            <p className="text-sm text-slate-600 line-clamp-2">
              {stripHtml(event.excerpt)}
            </p>
          )}
          <div className="pt-4 space-y-2 border-t border-slate-100">
            <div className="flex items-center text-sm text-slate-600">
              <CalendarDays className="h-4 w-4 mr-2 text-cardinal-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-cardinal-500" />
              <span>{event.eventData.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
