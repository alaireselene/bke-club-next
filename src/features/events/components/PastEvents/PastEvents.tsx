"use client";

import { useState } from "react";
import { EventCard } from "@/features/events/components/EventCard/EventCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loadMoreEvents } from "@/app/events/actions";
import type { PastEventsProps } from "./types";
import { parseISO, isBefore } from "date-fns";

export function PastEvents({
  initialEvents,
  initialHasMore,
  initialCursor,
}: PastEventsProps) {
  const [events, setEvents] = useState(initialEvents);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = await loadMoreEvents(cursor);

      const pastEvents = data.events.filter((event) => {
        if (!event?.eventData?.eventTime?.eventStartTime) return false;
        try {
          const eventStartTime = parseISO(
            event.eventData.eventTime.eventStartTime
          );
          return isBefore(eventStartTime, new Date());
        } catch (error) {
          console.error("Error parsing event start time:", error);
          return false;
        }
      });

      setEvents([...events, ...pastEvents]);
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    } catch (error) {
      console.error("Error loading more events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Sự kiện đã diễn ra</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <div
            key={event.databaseId}
            className="transform transition-all duration-300 hover:scale-[1.02] opacity-0 motion-safe:animate-[fadeIn_0.5s_ease-out_forwards] opacity-90 hover:opacity-100"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-white/50 hover:bg-white/80 min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải...
              </>
            ) : (
              "Xem thêm sự kiện"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
