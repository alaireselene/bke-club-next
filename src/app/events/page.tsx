import { Metadata } from "next";
import { directus, Event } from "@/lib/directus"; // Import directus client and Event type
import { readItems } from "@directus/sdk"; // Import readItems function
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { EventFilter } from "@/features/events/components/EventFilter";
import { getCategorySlug, getCategoryDisplayName } from "@/features/events/utils/categoryUtils"; // Import shared categories and helpers
import { Suspense } from "react";
// Event type is already updated in features/events/types.ts
import { parseISO, isBefore } from "date-fns";

export const metadata: Metadata = {
  title: "Sự kiện | HUST Research Clubs Network",
  description: "Các sự kiện được tổ chức bởi Thành viên Mạng lưới",
};

export const revalidate = 60; // Revalidate every hour

// Remove GraphQL specific EventsData interface

async function getEventsData() { // Fetch more initially for splitting
  try {
    const eventsData = await directus.request(readItems('event', {
      fields: ['*'], // Fetch all fields needed by EventCard and splitting logic
      sort: ['-event_start'], // Sort ascending by start date
    }));
    
    const events = eventsData as Event[];
    
    // Extract unique category identifiers (could be names or slugs) from the fetched events
    const allCategoryIdentifiers = events.flatMap(event => {
      try {
        const parsedCategories = typeof event.categories === 'string' ? JSON.parse(event.categories) : event.categories;
        return Array.isArray(parsedCategories) ? parsedCategories : [];
      } catch (e) {
        console.error("Error parsing categories for event:", event.id, e);
        return [];
      }
    });
    const uniqueIdentifiers = [...new Set(allCategoryIdentifiers)];

    // Map unique identifiers to consistent { name, slug } objects using the utility
    const uniqueCategories = uniqueIdentifiers.map(identifier => {
      const name = getCategoryDisplayName(identifier); // Get consistent display name
      const slug = getCategorySlug(identifier);       // Get consistent slug
      return { name, slug };
    }).filter((cat, index, self) => // Ensure uniqueness based on slug after mapping
      index === self.findIndex((c) => c.slug === cat.slug)
    );
    
    return {
      events: events,
      categories: uniqueCategories,
      // No pageInfo equivalent directly, pagination handled differently
    };
  } catch (error) {
    console.error("Error fetching events from Directus:", error);
    return { events: [], categories: [] };
  }
}

export default async function EventsPage() {
  const { events, categories } = await getEventsData();

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
          {/* Upcoming Events with Category Filter */}
          <Suspense fallback={<div>Đang tải...</div>}>
            <section>
              <h2 className="text-2xl font-bold mb-8">Sự kiện sắp diễn ra</h2>
              {upcomingEvents.length > 0 ? (
                <></>
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

          {/* Past Events with Category Filter */}
          <Suspense fallback={<div>Đang tải...</div>}>
            <section>
              <h2 className="text-2xl font-bold mb-8">Danh sách sự kiện</h2>
              {pastEvents.length > 0 ? (
                  <EventFilter
                      categories={categories}
                      events={events}
                  />
              ) : (
                <div className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60">
                  <div className="text-5xl mb-4">🎉</div>
                  <p>
                    Danh sách trống.
                  </p>
                </div>
              )}
            </section>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
