import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import type { Event, FeaturedImage } from "@/types/wordpress";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.eventData.eventTime.eventStartTime);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(startDate);

  return (
    <Link href={`/events/${event.slug}`}>
      <article className="group h-full bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden transition hover:shadow-md">
        {event.featuredImage?.node.sourceUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={event.featuredImage.node.sourceUrl}
              alt={event.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
              {event.title}
            </h3>
            {event.excerpt && (
              <p className="text-sm text-slate-600 line-clamp-2">
                {event.excerpt}
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
              {event.eventData.organizer && (
                <div className="flex items-center">
                  {event.eventData.organizer.logo?.node.sourceUrl && (
                    <Image
                      src={event.eventData.organizer.logo.node.sourceUrl}
                      alt={event.eventData.organizer.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                  )}
                  <span className="text-sm text-slate-600">
                    {event.eventData.organizer.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
