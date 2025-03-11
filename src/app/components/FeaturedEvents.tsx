"use client";

import { useState } from "react";
import { Event } from "@/db/schema";
import { EventCard } from "./ui/EventCard";
import { CategoryTabs } from "./ui/CategoryTabs";

type FeaturedEventsProps = {
  events: Event[];
};

type CategoryType = "All" | Event["type"];

const categories: CategoryType[] = [
  "All",
  "workshop",
  "competition",
  "cultural",
  "research",
  "symposium",
];

const categoryLabels: Record<CategoryType, string> = {
  All: "Tất cả",
  workshop: "Hội thảo",
  competition: "Cuộc thi",
  cultural: "Văn hóa",
  research: "Nghiên cứu",
  symposium: "Hội nghị",
};

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.type === selectedCategory);

  // Taking the last event as hero (or the last of first 5 if available)
  const heroEvent =
    filteredEvents[4] || filteredEvents[filteredEvents.length - 1];
  const smallEvents = filteredEvents.slice(0, 4);

  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Sự kiện sắp diễn ra</h2>
          <p className="text-base-content/70 text-lg">
            Tham gia cùng cộng đồng nghiên cứu của chúng tôi
          </p>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            labels={categoryLabels}
            selected={selectedCategory}
            onChange={setSelectedCategory}
            className="mt-8"
          />
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Small Events Grid */}
            <div className="grid gap-6 lg:col-span-7 lg:grid-cols-2">
              {smallEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Hero Event */}
            {heroEvent && (
              <div className="lg:col-span-5">
                <EventCard event={heroEvent} isHero />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-base-content/60">
            Không tìm thấy sự kiện nào trong danh mục này.
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="/events" className="btn btn-primary btn-lg">
            Xem tất cả sự kiện
          </a>
        </div>
      </div>
    </section>
  );
}
