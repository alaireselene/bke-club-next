import type { Event } from "../../types";

interface PastEventsProps {
  initialEvents: Array<Event>;
  initialHasMore: boolean;
  initialCursor: string;
}

export type { PastEventsProps }