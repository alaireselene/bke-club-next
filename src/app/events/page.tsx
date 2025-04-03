import { Metadata } from "next";
import { directus, Event } from "@/lib/directus"; // Import directus client and Event type
import { readItems } from "@directus/sdk"; // Import readItems function
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { EventCard } from "@/features/events/components/EventCard/EventCard";
import { PastEvents } from "@/features/events/components/PastEvents/PastEvents";
import { Suspense } from "react";
// Event type is already updated in features/events/types.ts
import { parseISO, isBefore } from "date-fns";

export const metadata: Metadata = {
  title: "Sự kiện | HUST Research Clubs Network",
  description: "Các sự kiện được tổ chức bởi Thành viên Mạng lưới",
};

export const revalidate = 60; // Revalidate every hour

// Remove GraphQL specific EventsData interface

async function getEventsData(limit = 20) { // Fetch more initially for splitting
  try {
    const eventsData = await directus.request(readItems('event', {
      fields: ['*'], // Fetch all fields needed by EventCard and splitting logic
      sort: ['event_start'], // Sort ascending by start date
      limit: limit,
      // We might need more complex filtering/sorting later if we want *all* upcoming
      // and then paginate past events separately. For now, fetch a mixed batch.
    }));
    return {
      events: eventsData as Event[],
      // No pageInfo equivalent directly, pagination handled differently
    };
  } catch (error) {
    console.error("Error fetching events from Directus:", error);
    return { events: [] };
  }
}

export default async function EventsPage() {
  const initialFetchLimit = 20; // Match the limit in getEventsData
  const { events } = await getEventsData(initialFetchLimit);

  const upcomingEvents = events.filter((event) => {
    // Use direct event_start field
    if (!event?.event_start) return false;
    try {
      const eventStartTime = parseISO(event.event_start); // Assuming ISO string
      return !isBefore(eventStartTime, new Date()); // Check if event start is not before now
    } catch (error) {
      console.error("Error parsing event start time:", error);
      return false;
    }
  });

  const pastEvents = events.filter((event) => {
    // Use direct event_start field
    if (!event?.event_start) return false;
    try {
      const eventStartTime = parseISO(event.event_start); // Assuming ISO string
      return isBefore(eventStartTime, new Date()); // Check if event start is before now
    } catch (error) {
      console.error("Error parsing event start time:", error);
      return false;
    }
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#003366] opacity-5 -rotate-1" />
          <PageHeader
            title="Sự kiện"
            description="Các sự kiện được tổ chức bởi Thành viên Mạng lưới"
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        <div className="space-y-16">
          {/* Upcoming Events */}
          <Suspense fallback={<div>Đang tải...</div>}>
            <section>
              <h2 className="text-2xl font-bold mb-8">Sự kiện sắp diễn ra</h2>
              {upcomingEvents.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={event.id} // Use id
                      className="transform transition-all duration-300 hover:scale-[1.02] opacity-0 motion-safe:animate-[fadeIn_0.5s_ease-out_forwards]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
                  <div className="text-5xl mb-4">🎉</div>
                  <p>
                    Hiện tại không có sự kiện nào sắp diễn ra.
                    <br />
                    Vui lòng quay lại sau!
                  </p>
                </div>
              )}
            </section>
          </Suspense>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <Suspense fallback={<div>Đang tải...</div>}>
              <PastEvents
                initialEvents={pastEvents}
                // Pass initial past events. Pagination props need adjustment
                // based on how PastEvents will be refactored (e.g., pass total fetched count or initial offset)
                // For now, remove cursor/hasMore props derived from GraphQL pageInfo
                // We might need to calculate if more past events *could* exist based on initial fetch
                // Estimate initialHasMore based on whether the initial fetch returned the limit
                initialHasMore={events.length === initialFetchLimit}
                // Remove initialCursor prop
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}
