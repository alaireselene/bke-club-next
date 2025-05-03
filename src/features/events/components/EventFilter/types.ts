import type { Event } from "../../types";

interface Category {
  slug: string;
  name: string;
}

interface EventFilterProps {
  categories: Array<Category>;
  events: Array<Event>;
}

export type { EventFilterProps }
