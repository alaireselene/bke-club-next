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
  // Remove initialCursor from props
}: PastEventsProps) {
  const [events, setEvents] = useState(initialEvents);
  const [hasMore, setHasMore] = useState(initialHasMore);
  // Use offset state instead of cursor
  const [offset, setOffset] = useState(initialEvents.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // Call loadMoreEvents with the current offset
      const data = await loadMoreEvents(offset);

      // The action should now only return past events, no need to filter here
      const newPastEvents = data.events;

      setEvents([...events, ...newPastEvents]);
      setHasMore(data.pageInfo.hasNextPage);
      // Update offset for the next fetch
      setOffset(offset + newPastEvents.length);
    } catch (error) {
      console.error("Error loading more events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Sự kiện đã diễn ra</h2> {/* Adjusted size/margin */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="min-w-[200px]" // Removed custom background styles
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
