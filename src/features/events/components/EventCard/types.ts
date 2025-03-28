import type { Event } from "../../types";

interface EventCardProps {
  event: Event;
  className?: string;
  showOrganizer?: boolean;
  showCapacity?: boolean;
}

export type { EventCardProps }