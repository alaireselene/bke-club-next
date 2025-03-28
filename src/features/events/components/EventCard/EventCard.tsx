import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { parseDate, formatDate } from "@/lib/utils/date";

import type { EventCardProps } from "./types";

const stripHtml = (html: string) => {
  return html?.replace(/<[^>]*>/g, "") || "";
};

export function EventCard({
  event,
  className,
  showOrganizer = false,
  showCapacity = false,
}: EventCardProps) {
  if (!event?.eventData?.eventTime) {
    return null;
  }

  const { eventTime, location, delivery, capacity, organizer } =
    event.eventData;
  const startDate = eventTime.eventStartTime
    ? parseDate(eventTime.eventStartTime)
    : null;
  const isOnline = delivery === "virtual";

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn("block h-full", className)}
    >
      <Card className="group h-full transition hover:shadow-md">
        {/* Featured Image */}
        {event.featuredImage?.node?.sourceUrl && (
          <div className="relative h-48 w-full overflow-hidden shrink-0">
            <Image
              src={event.featuredImage.node.sourceUrl}
              alt={
                event.featuredImage.node.altText || event.title || "Ảnh sự kiện"
              }
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className="space-y-4 p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
            {event.title || "Sự kiện chưa có tiêu đề"}
          </h3>

          {/* Excerpt */}
          {event.excerpt && (
            <p className="text-sm text-slate-600 line-clamp-2">
              {stripHtml(event.excerpt)}
            </p>
          )}

          {/* Organizer */}
          {showOrganizer && organizer && (
            <div className="flex items-center gap-2">
              {organizer.logo?.node?.sourceUrl && (
                <Image
                  src={organizer.logo.node.sourceUrl}
                  alt={organizer.logo.node.altText || organizer.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-slate-600">{organizer.name}</span>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 space-y-2 border-t border-slate-100">
            {/* Date */}
            <div className="flex items-center text-sm text-slate-600">
              <CalendarDays className="h-4 w-4 mr-2 text-cardinal-500" />
              <span>{startDate ? formatDate(startDate) : "Đang cập nhật"}</span>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-slate-600">
              {isOnline ? (
                <>
                  <Globe className="h-4 w-4 mr-2 text-cardinal-500" />
                  <span>Trực tuyến</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2 text-cardinal-500" />
                  <span>{location || "Đang cập nhật địa điểm"}</span>
                </>
              )}
            </div>

            {/* Capacity */}
            {showCapacity && capacity && (
              <div className="flex items-center text-sm text-slate-600">
                <Users className="h-4 w-4 mr-2 text-cardinal-500" />
                <span>{capacity} người tham dự</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
