// TODO: Render this from Wordpress instead of write it from scratch shit.
// TODO: Move this component to seperate folder instead of leave it alone, then add types.ts and index.ts
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"; // Added MapPin
import { Button } from "@/components/ui/button"; // Import Button
import { cn } from "@/lib/utils"; // Import cn
import type { EventType, Event } from "./types";

// Updated eventStyles using theme colors (adjust as needed for contrast/design)
const eventStyles: Record<EventType, string> = {
  workshop: "bg-primary/10 border-primary/50 text-primary-foreground", // Example: Primary
  competition: "bg-secondary/10 border-secondary/50 text-secondary-foreground", // Example: Secondary
  cultural: "bg-accent/10 border-accent/50 text-accent-foreground", // Example: Accent
  research: "bg-muted border-border text-muted-foreground", // Example: Muted
  synposium: "bg-info/10 border-info/50 text-info-foreground", // Example: Info (assuming info colors are defined)
};

export function WeekCalendar({ events }: { events: Event[] }) {
  const [currentDate] = useState(new Date()); // Keep track of today
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date(); // Start from today
    date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Start week on Monday
    date.setHours(0, 0, 0, 0); // Normalize time
    return date;
  });

  const nextWeek = () => {
    setCurrentWeek(prevWeek => {
      const next = new Date(prevWeek);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  const previousWeek = () => {
    setCurrentWeek(prevWeek => {
      const prev = new Date(prevWeek);
      prev.setDate(prev.getDate() - 7);
      return prev;
    });
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentWeek);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toDateString();
    return events.filter(
      (event) => event.startDate.toDateString() === dateString
    );
  };

  const weekDays = getWeekDays();
  const todayString = currentDate.toDateString();

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Replaced custom buttons with Button component */}
          <Button variant="outline" size="icon" onClick={previousWeek} aria-label="Tuần trước">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-lg sm:text-xl font-semibold text-foreground text-center flex-grow sm:flex-grow-0">
            {currentWeek.toLocaleDateString("vi-VN", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button variant="outline" size="icon" onClick={nextWeek} aria-label="Tuần sau">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"> {/* Use theme colors/border */}
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-muted/50"> {/* Use theme color */}
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="border-b border-border px-2 py-3 text-center" /* Use theme border */
            >
              <div className="text-xs sm:text-sm font-medium text-muted-foreground"> {/* Use theme color */}
                {day.toLocaleDateString("vi-VN", { weekday: "short" })}
              </div>
              <div className={cn(
                "mt-1 text-base sm:text-lg font-semibold",
                 day.toDateString() === todayString ? "text-primary" : "text-foreground" // Highlight today's date number
                 )}>
                {day.getDate()} {/* Show only day number */}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 divide-x divide-border"> {/* Use theme border */}
          {weekDays.map((day) => {
            const isToday = day.toDateString() === todayString;
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  `group relative min-h-[120px] border-b border-border p-2 sm:p-3 transition-colors sm:min-h-[150px]`, // Adjusted padding/min-height
                  isToday ? "bg-primary/5" : "hover:bg-muted/50" // Use theme colors
                )}
              >
                <div className="space-y-1.5"> {/* Adjusted spacing */}
                  {getEventsForDate(day).map((event) => (
                    <a
                      key={event.id}
                      href={`/events/${event.slug}`} // Assuming slug exists, otherwise use id
                      className={cn(
                        `block rounded border p-1.5 sm:p-2 shadow-sm text-xs sm:text-sm`, // Adjusted padding/size
                        eventStyles[event.type] || "bg-muted border-border text-muted-foreground", // Fallback style
                        `transform cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-1 focus:ring-primary` // Use theme ring
                      )}
                    >
                      <div className="font-semibold leading-snug line-clamp-2"> {/* Added line-clamp */}
                        {event.title}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs opacity-80"> {/* Adjusted gap/opacity */}
                        <span className="inline-flex items-center rounded bg-background/50 px-1 py-0.5 text-[10px] sm:text-xs font-medium backdrop-blur-sm"> {/* Use theme background */}
                          {event.startDate.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {/* Show end time only if different from start time */}
                          {event.endDate.getTime() !== event.startDate.getTime() && ` - ${event.endDate.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-xs opacity-70"> {/* Adjusted size/opacity */}
                          <MapPin className="h-3 w-3 flex-shrink-0" /> {/* Replaced SVG */}
                          <span className="truncate">{event.location}</span> {/* Added truncate */}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
                {getEventsForDate(day).length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <span className="rounded-full bg-background/80 px-2 py-0.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm"> {/* Use theme colors */}
                      Trống
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
