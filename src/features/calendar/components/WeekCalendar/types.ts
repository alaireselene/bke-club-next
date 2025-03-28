type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: EventType;
  slug: string;
};

type EventType =
  | "workshop"
  | "competition"
  | "cultural"
  | "research"
  | "synposium";

export type { Event, EventType }