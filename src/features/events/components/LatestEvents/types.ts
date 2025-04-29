import type { Event } from "../../types";

type FeaturedEventsProps = {
  events: Array<Event>;
};

type CategoryType = "competition" | "symposium" | "research-event";

export type { FeaturedEventsProps, CategoryType }