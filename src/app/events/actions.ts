"use server";

import { directus, Event } from "@/lib/directus"; // Import directus client and Event type
import { readItems } from "@directus/sdk"; // Import readItems function

// Define a simpler response type for offset pagination
interface EventsResponse {
  events: Array<Event>;
  pageInfo: {
    hasNextPage: boolean;
  };
}

const PAGE_SIZE = 12; // Define page size for past events loading

export async function loadMoreEvents(offset: number): Promise<EventsResponse> {
  try {
    const eventsData = await directus.request(readItems('event', {
      fields: ['*'], // Fetch fields needed by EventCard
      filter: { event_start: { _lt: "$NOW" } }, // Filter for past events
      sort: ['-event_start'], // Sort by most recent past event first
      offset: offset,
      limit: PAGE_SIZE,
    }));

    const fetchedEvents = eventsData as Event[];
    const hasMore = fetchedEvents.length === PAGE_SIZE;

    return {
      events: fetchedEvents,
      pageInfo: { hasNextPage: hasMore },
    };
  } catch (error) {
    console.error("Error loading more past events from Directus:", error);
    return {
      events: [],
      pageInfo: { hasNextPage: false },
    };
  }
}