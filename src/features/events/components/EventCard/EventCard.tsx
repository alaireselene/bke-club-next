import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date";
import { createExcerpt } from "@/lib/utils/contentModify";

import type { EventCardProps } from "./types";

/**
 * EventCard - Responsive, modern card for event display.
 *
 * Usage:
 * <EventCard event={event} />
 *
 * - Full-bleed image (aspect-[16/9])
 * - Consistent badge for category/type
 * - Responsive, bold title and excerpt
 * - Modern hover/focus effects
 * - Clean metadata section
 */
export function EventCard({
  event,
  className,
  showOrganizer = false,
  showCapacity = false,
}: EventCardProps) {
  const { location, delivery, capacity, organizer_name, organizer_logo_url, event_start, description, featured_image, categories } = event;
  const startDate = event_start;
  const isOnline = delivery === "virtual";
  const excerpt = createExcerpt(description);
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  const imageUrl = featured_image ? `${directusUrl}/assets/${featured_image}` : null;

  return (
    <Link
      href={`/events/${event.id}`}
      tabIndex={0}
      className={cn("focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg block h-full", className)}
    >
      <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card">
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
            <Image
              src={imageUrl}
              alt={event.title || "Event Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
        <CardContent className="flex flex-col flex-grow gap-4 p-6 sm:p-8">
          {/* Badge for event type/category if present */}
          {categories && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              {categories[0]}
            </span>
          )}
          <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {event.title || "Sự kiện chưa có tiêu đề"}
          </h3>
          {excerpt && (
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}
          {/* Organizer info */}
          {showOrganizer && organizer_name && (
            <div className="flex items-center gap-2 mt-2">
              {organizer_logo_url && (
                <Image
                  src={organizer_logo_url}
                  alt={organizer_name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">{organizer_name}</span>
            </div>
          )}
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 pt-4 mt-auto border-t border-border">
            {/* Date */}
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-2 text-primary" />
              <span>{startDate ? formatDate(startDate) : "Đang cập nhật"}</span>
            </div>
            {/* Location */}
            <div className="flex items-center text-xs text-muted-foreground">
              {isOnline ? (
                <>
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>Trực tuyến</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{location || "Đang cập nhật"}</span>
                </>
              )}
            </div>
            {/* Capacity */}
            {showCapacity && capacity && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span>{capacity ?? 'N/A'} người tham dự</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
