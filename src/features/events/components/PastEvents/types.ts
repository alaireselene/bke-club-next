import type { Event } from "../../types";

interface PastEventsProps {
  initialEvents: Array<Event>;
  initialHasMore: boolean; // Keep this, parent will estimate if more might exist
  // Remove initialCursor as we'll use offset
}

export type { PastEventsProps }