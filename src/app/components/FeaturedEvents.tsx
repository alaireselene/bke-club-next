"use client";

import { useState } from "react";
import { EventCard } from "./ui/EventCard";
import { CategoryTabs } from "./ui/CategoryTabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Event } from "@/types/wordpress";

type FeaturedEventsProps = {
  events: Event[];
};

type CategoryType = "competition" | "symposium" | "research-event";

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

  const heroEvent =
    filteredEvents[4] || filteredEvents[filteredEvents.length - 1];
  const smallEvents = filteredEvents.slice(0, 4);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Scientific background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-base-200"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.03)_0%,transparent_60%)]"
        />
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 0.6, rotate: 0, scale: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute left-0 top-20 h-40 w-40 rounded-full border border-dashed border-cardinal-200/30"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
          animate={{ opacity: 0.6, rotate: 0, scale: 1 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute right-0 bottom-20 h-60 w-60 rounded-full border border-dashed border-sunflower-200/30"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-cardinal-50 text-cardinal-600 text-sm font-medium"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-cardinal-500 mr-2"
            />
            Sự kiện
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-cardinal-700 to-cardinal-500 bg-clip-text text-transparent"
          >
            Sự kiện sắp diễn ra
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base-content/70 text-lg max-w-2xl"
          >
            Tham gia cùng cộng đồng nghiên cứu của chúng tôi trong các sự kiện
            học thuật, hội thảo và cuộc thi
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CategoryTabs
              categories={categories}
              defaultSelected={null}
              onSelect={(categoryId) =>
                setSelectedCategory(categoryId as CategoryType | null)
              }
              className="mt-8"
            />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key="events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 lg:grid-cols-12"
            >
              {/* Small Events Grid */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid gap-6 lg:col-span-7 lg:grid-cols-2"
              >
                {smallEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div whileHover={{ y: -4 }}>
                      <EventCard event={event} />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Hero Event */}
              {heroEvent && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="lg:col-span-5"
                >
                  <motion.div whileHover={{ y: -4 }}>
                    <EventCard event={heroEvent} />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 text-base-content/60 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-200/60"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🔍
              </motion.div>
              <p>Không tìm thấy sự kiện nào trong danh mục này.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cardinal-600 to-cardinal-500 text-white font-semibold relative overflow-hidden"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cardinal-600 to-cardinal-500"></span>
              <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
              <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>
              <span className="relative">Xem tất cả sự kiện</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
