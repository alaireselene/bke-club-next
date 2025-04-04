import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date"; // Keep formatDate, remove parseDate if start date is ISO string
import { createExcerpt } from "@/lib/utils/contentModify"; // Import excerpt util

import type { EventCardProps } from "./types";

// Remove stripHtml, use createExcerpt utility

export function EventCard({
  event,
  className,
  showOrganizer = false,
  showCapacity = false,
}: EventCardProps) {
  // Use direct properties from Directus Event type
  const { location, delivery, capacity, organizer_name, organizer_logo_url, event_start, description } = event;
  const startDate = event_start; // Assuming event_start is an ISO string
  const isOnline = delivery === "virtual"; // Assuming 'virtual' is the value used in Directus
  const excerpt = createExcerpt(description); // Generate excerpt from description

  return (
    <Link
      href={`/events/${event.id}`} // Link using id
      className={cn("block h-full", className)}
    >
      <Card className="group h-full flex flex-col"> {/* Ensure flex column for consistency, hover handled by base Card */}
        {/* Featured Image */}
        {/* Removed featuredImage */}

        <CardContent className="space-y-4 flex-grow"> {/* Removed p-6, added flex-grow */}
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors"> {/* Use text-primary for hover */}
            {event.title || "Sự kiện chưa có tiêu đề"}
          </h3>

          {/* Excerpt */}
          {/* Display generated excerpt */}
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2"> {/* Use text-muted-foreground */}
              {excerpt}
            </p>
          )}

          {/* Organizer */}
          {/* Use organizer_name and organizer_logo_url */}
          {showOrganizer && organizer_name && (
            <div className="flex items-center gap-2">
              {organizer_logo_url && (
                <Image
                  src={organizer_logo_url} // Use direct URL
                  alt={organizer_name} // Use organizer name for alt
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">{organizer_name}</span> {/* Use text-muted-foreground */}
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 space-y-2 border-t border-border"> {/* Use border-border */}
            {/* Date */}
            <div className="flex items-center text-sm text-muted-foreground"> {/* Use text-muted-foreground */}
              <CalendarDays className="h-4 w-4 mr-2 text-primary" /> {/* Use primary brand color */}
              <span>{startDate ? formatDate(startDate) : "Đang cập nhật"}</span>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-muted-foreground"> {/* Use text-muted-foreground */}
              {isOnline ? (
                <>
                  <Globe className="h-4 w-4 mr-2 text-primary" /> {/* Use primary brand color */}
                  <span>Trực tuyến</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2 text-primary" /> {/* Use primary brand color */}
                  <span>{location || "Đang cập nhật"}</span> {/* Use location */}
                </>
              )}
            </div>

            {/* Capacity */}
            {showCapacity && capacity && (
              <div className="flex items-center text-sm text-muted-foreground"> {/* Use text-muted-foreground */}
                <Users className="h-4 w-4 mr-2 text-primary" /> {/* Use primary brand color */}
                <span>{capacity ?? 'N/A'} người tham dự</span> {/* Use capacity */}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
