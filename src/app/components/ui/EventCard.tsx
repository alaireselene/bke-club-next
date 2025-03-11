"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { formatDate } from "@/lib/utils/date";
import type { Event } from "@/db/schema";

type EventCardProps = {
  event: Event;
  isHero?: boolean;
  className?: string;
};

const eventTypeLabels: Record<Event["type"], string> = {
  workshop: "Hội thảo",
  competition: "Cuộc thi",
  cultural: "Văn hóa",
  research: "Nghiên cứu",
  symposium: "Hội nghị",
};

const getEventTypeLabel = (type: Event["type"]) =>
  eventTypeLabels[type] || type;

// Placeholder until we add it to the schema
const getParticipants = (event: Event) =>
  event.capacity || Math.floor(Math.random() * 1000) + 100;
const formatParticipants = (count: number) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

export function EventCard({
  event,
  isHero = false,
  className,
}: EventCardProps) {
  const imageHeight = isHero ? "h-72 sm:h-96" : "h-48";

  return (
    <Link href={`/events/${event.id}`}>
      <BaseCard
        padding="p-0"
        background="bg-base-100"
        hover
        hoverScale
        rounded="rounded-xl"
        className={className}
      >
        <div className="relative">
          <Image
            src={event.imageUrl || "https://placehold.co/1200x800"}
            alt={event.title}
            width={1200}
            height={800}
            className={`w-full object-cover transition-transform group-hover:scale-105 ${imageHeight}`}
            loading={isHero ? "eager" : "lazy"}
          />
        </div>

        <div className="flex h-full flex-col p-5">
          <div className="flex-1">
            <div className="mb-3 space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/60">
                <span className="badge badge-primary badge-outline">
                  {getEventTypeLabel(event.type)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {formatParticipants(getParticipants(event))}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <h3
              className={`font-sans font-bold uppercase text-neutral-content ${
                isHero ? "mb-3 text-2xl" : "mb-3 text-lg"
              }`}
            >
              {event.title}
            </h3>

            {isHero && event.summary && (
              <p className="mb-6 font-sans text-base-content/70">
                {event.summary}
              </p>
            )}
          </div>

          <div className="mt-auto inline-flex items-center font-medium text-primary hover:text-primary-focus">
            Xem chi tiết
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </BaseCard>
    </Link>
  );
}
