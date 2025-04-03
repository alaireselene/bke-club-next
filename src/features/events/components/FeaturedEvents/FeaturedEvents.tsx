"use client";

import { useState } from "react";
import { EventCard } from "../EventCard/EventCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button
import type { FeaturedEventsProps, CategoryType } from "./types";

const categories = [
  { slug: "competition", name: "Cuộc thi" },
  { slug: "symposium", name: "Hội nghị" },
  { slug: "research-event", name: "Nghiên cứu" },
];

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const filteredEvents = !selectedCategory
    ? events
    : events.filter((event) => {
        try {
          // Parse the JSON string/array from Directus 'categories' field
          const parsedCategories = typeof event.categories === 'string'
            ? JSON.parse(event.categories)
            : event.categories; // Assume it might already be parsed

          // Check if the resulting array includes the selected category
          return Array.isArray(parsedCategories) && parsedCategories.includes(selectedCategory);
        } catch (e) {
          console.error("Error parsing categories for event:", event.id, e);
          return false; // Exclude if categories JSON is invalid
        }
      });

  const heroEvent = filteredEvents[0];
  const smallEvents = filteredEvents.slice(1, 5);

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden"> {/* Adjusted padding */}
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-muted/50" /> {/* Use theme color */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.03)_0%,transparent_60%)]" />
        <div className="absolute left-0 top-20 h-40 w-40 rounded-full border border-dashed border-primary/20" /> {/* Use theme color */}
        <div className="absolute right-0 bottom-20 h-60 w-60 rounded-full border border-dashed border-accent/20" /> {/* Use theme color */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 flex flex-col items-center text-center"> {/* Adjusted margin */}
          <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"> {/* Use theme color */}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2" />
            Sự kiện
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> {/* Adjusted size & color */}
            Sự kiện sắp diễn ra
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl"> {/* Use theme color, adjusted size */}
            Tham gia cùng cộng đồng nghiên cứu của chúng tôi trong các sự kiện
            học thuật, hội thảo và cuộc thi
          </p>

          <CategoryTabs
            categories={categories}
            defaultSelected={null}
            onSelect={(categoryId) =>
              setSelectedCategory(categoryId as CategoryType | null)
            }
            className="mt-6 sm:mt-8" // Adjusted margin
          />
        </div>

        {filteredEvents.length > 0 ? (
          <div key="events" className="grid gap-6 sm:gap-8 lg:grid-cols-12"> {/* Removed fixed height, adjusted gap */}
            {/* Hero Event */}
            {heroEvent && (
              <div className="lg:col-span-7"> {/* Removed h-full */}
                <EventCard event={heroEvent} />
              </div>
            )}

            {/* Small Events Grid */}
            {smallEvents.length > 0 && (
              <div className="grid grid-rows-2 gap-6 sm:gap-8 lg:col-span-5"> {/* Adjusted gap */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"> {/* Stack on smallest, adjusted gap */}
                  {smallEvents.slice(0, 2).map((event) => (
                    <div key={event.id}> {/* Use id, removed h-full */}
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"> {/* Stack on smallest, adjusted gap */}
                  {smallEvents.slice(2, 4).map((event) => (
                    <div key={event.id}> {/* Use id, removed h-full */}
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            key="empty"
            className="text-center py-12 sm:py-16 text-muted-foreground bg-card rounded-lg border border-border" // Use theme colors/border
          >
            <div className="text-4xl sm:text-5xl mb-4">🔍</div> {/* Adjusted size */}
            <p className="text-base sm:text-lg">Không tìm thấy sự kiện nào trong danh mục này.</p> {/* Adjusted size */}
          </div>
        )}

        <div className="mt-12 sm:mt-16 text-center"> {/* Adjusted margin */}
          {/* Replaced custom Link with standard Button */}
          <Link href="/events" passHref legacyBehavior>
            <Button size="lg" asChild>
              <a>
                Xem tất cả sự kiện
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
