"use client";

import { useState } from "react";
import { EventCard } from "../EventCard/EventCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    : events.filter((event) =>
        event.categories?.nodes.some((cat) => cat.slug === selectedCategory)
      );

  const heroEvent = filteredEvents[0];
  const smallEvents = filteredEvents.slice(1, 5);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-base-200" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.03)_0%,transparent_60%)]" />
        <div className="absolute left-0 top-20 h-40 w-40 rounded-full border border-dashed border-cardinal-200/30" />
        <div className="absolute right-0 bottom-20 h-60 w-60 rounded-full border border-dashed border-sunflower-200/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-cardinal-50 text-cardinal-600 text-sm font-medium">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cardinal-500 mr-2" />
            Sự kiện
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cardinal-700 to-cardinal-500 bg-clip-text text-transparent">
            Sự kiện sắp diễn ra
          </h2>

          <p className="text-base-content/70 text-lg max-w-2xl">
            Tham gia cùng cộng đồng nghiên cứu của chúng tôi trong các sự kiện
            học thuật, hội thảo và cuộc thi
          </p>

          <CategoryTabs
            categories={categories}
            defaultSelected={null}
            onSelect={(categoryId) =>
              setSelectedCategory(categoryId as CategoryType | null)
            }
            className="mt-8"
          />
        </div>

        {filteredEvents.length > 0 ? (
          <div key="events" className="grid gap-8 lg:grid-cols-12 h-[500px]">
            {/* Hero Event */}
            {heroEvent && (
              <div className="lg:col-span-7 h-full">
                <div className="h-full">
                  <EventCard event={heroEvent} />
                </div>
              </div>
            )}

            {/* Small Events Grid */}
            <div className="grid grid-rows-2 gap-8 lg:col-span-5 h-full">
              <div className="grid grid-cols-2 gap-8 h-full">
                {smallEvents.slice(0, 2).map((event, index) => (
                  <div key={event.databaseId} className="h-full">
                    <div className="h-full">
                      <EventCard event={event} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-8 h-full">
                {smallEvents.slice(2, 4).map((event, index) => (
                  <div key={event.databaseId} className="h-full">
                    <div className="h-full">
                      <EventCard event={event} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            key="empty"
            className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p>Không tìm thấy sự kiện nào trong danh mục này.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cardinal-600 to-cardinal-500 text-white font-semibold relative overflow-hidden"
          >
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cardinal-600 to-cardinal-500"></span>
            <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
            <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>
            <span className="relative">Xem tất cả sự kiện</span>
            <span>
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
