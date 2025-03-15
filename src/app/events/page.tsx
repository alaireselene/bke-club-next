import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_EVENTS } from "@/lib/graphql/queries";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { EventCard } from "@/app/components/ui/EventCard";
import type { Event } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Sự kiện | HUST Research Clubs Network",
  description: "Các sự kiện được tổ chức bởi Thành viên Mạng lưới",
};

async function getEventsData() {
  const { data } = await getClient().query({
    query: GET_EVENTS,
    variables: {
      first: 100,
    },
  });

  return {
    events: data.posts.nodes as Event[],
  };
}

export default async function EventsPage() {
  const { events } = await getEventsData();

  // Debug output
  console.log("Events data:", JSON.stringify(events, null, 2));
  const now = new Date();
  // Use UTC time for comparison to match server timestamps
  const currentTime = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );

  // Debug date comparisons
  const upcomingEvents = events.filter((event) => {
    const eventTime = new Date(
      event.eventData.eventTime.eventStartTime
    ).getTime();
    console.log(`Event: ${event.title}`);
    console.log(
      `Event time: ${new Date(
        event.eventData.eventTime.eventStartTime
      ).toISOString()}`
    );
    console.log(`Current time: ${new Date(currentTime).toISOString()}`);
    console.log(`Is upcoming: ${eventTime >= currentTime}`);
    return eventTime >= currentTime;
  });

  const pastEvents = events.filter((event) => {
    const eventTime = new Date(
      event.eventData.eventTime.eventStartTime
    ).getTime();
    return eventTime < currentTime;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <PageHeader
          title="Sự kiện"
          description="Các sự kiện được tổ chức bởi Thành viên Mạng lưới"
        />

        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Sự kiện sắp diễn ra</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.databaseId} event={event} />
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

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Sự kiện đã diễn ra</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
