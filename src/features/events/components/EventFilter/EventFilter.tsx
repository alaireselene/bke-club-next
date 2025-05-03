"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { EventCard } from "@/features/events/components/EventCard/EventCard";
import type { Event } from "../../types";
import type { EventFilterProps } from "./types";

export function EventFilter({
  categories,
  events: initialEvents,
}: EventFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [events] = useState<Array<Event>>(initialEvents);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return events;

    return events.filter((event) => {
      try {
        // Parse the JSON string from Directus 'categories' field
        const parsedCategories = typeof event.categories === 'string'
          ? JSON.parse(event.categories)
          : event.categories; // Assume it might already be parsed if fetched differently later

        // Check if the resulting array includes the selected category
        return Array.isArray(parsedCategories) && parsedCategories.includes(selectedCategory);
      } catch (e) {
        console.error("Error parsing categories for event:", event.id, e);
        return false; // Exclude if categories JSON is invalid
      }
    });
  }, [events, selectedCategory]);


  return (
    <div className="space-y-8">
      <CategoryTabs
        categories={categories}
        onSelect={setSelectedCategory}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" // Use theme background
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="transform transition-all duration-300 hover:scale-[1.02]"
          >
            <EventCard event={event} />
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border">
            <div className="text-4xl sm:text-5xl mb-4">🗓️</div>
            <p className="text-base sm:text-lg">Không có sự kiện nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
