import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/features/events/graphql/queries";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { EventCard } from "@/features/events/components/EventCard/EventCard";
import { PastEvents } from "@/features/events/components/PastEvents/PastEvents";
import { Suspense } from "react";
import type { Event } from "@/features/events";
import { parseISO, isBefore } from "date-fns";

export const metadata: Metadata = {
  title: "Sự kiện | HUST Research Clubs Network",
  description: "Các sự kiện được tổ chức bởi Thành viên Mạng lưới",
};

export const revalidate = 60; // Revalidate every hour

interface EventsData {
  posts: {
    nodes: Event[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

async function getEventsData() {
  const { data } = await getClient().query<EventsData>({
    query: GET_ALL_EVENTS,
    variables: {
      first: 12,
      after: null,
    },
  });

  return {
    events: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}

export default async function EventsPage() {
  const { events, pageInfo } = await getEventsData();

  const upcomingEvents = events.filter((event) => {
    if (!event?.eventData?.eventTime?.eventStartTime) return false;
    try {
      const eventStartTime = parseISO(event.eventData.eventTime.eventStartTime);
      return !isBefore(eventStartTime, new Date());
    } catch (error) {
      console.error("Error parsing event start time:", error);
      return false;
    }
  });

  const pastEvents = events.filter((event) => {
    if (!event?.eventData?.eventTime?.eventStartTime) return false;
    try {
      const eventStartTime = parseISO(event.eventData.eventTime.eventStartTime);
      return isBefore(eventStartTime, new Date());
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
                      key={event.databaseId}
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
                initialHasMore={pageInfo.hasNextPage}
                initialCursor={pageInfo.endCursor}
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}
