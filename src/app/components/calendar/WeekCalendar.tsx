"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Loader2 } from "lucide-react";

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

const eventStyles: Record<EventType, string> = {
  workshop: "bg-cardinal-50 border-cardinal-400 text-cardinal-800",
  competition: "bg-navy-50 border-navy-400 text-navy-800",
  cultural: "bg-sunflower-50 border-sunflower-400 text-charcoal-800",
  research: "bg-charcoal-50 border-charcoal-400 text-charcoal-800",
  synposium: "bg-navy-50 border-navy-400 text-navy-800",
};

export function WeekCalendar({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + 1); // Start week on Monday
    return date;
  });

  const nextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const previousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.startDate.toDateString() === date.toDateString()
    );
  };

  const weekDays = getWeekDays();

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            className="group rounded-lg bg-cardinal-600 px-4 py-2 text-white shadow-sm transition-all hover:bg-cardinal-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cardinal-500 focus:ring-offset-2 active:bg-cardinal-800"
            onClick={previousWeek}
          >
            <span className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
              Tuần trước
            </span>
          </button>
          <span className="text-xl font-bold text-charcoal-800">
            {currentWeek.toLocaleDateString("vi-VN", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            className="group rounded-lg bg-cardinal-600 px-4 py-2 text-white shadow-sm transition-all hover:bg-cardinal-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cardinal-500 focus:ring-offset-2 active:bg-cardinal-800"
            onClick={nextWeek}
          >
            <span className="flex items-center gap-2">
              Tuần sau
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-charcoal-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gradient-to-br from-navy-50 to-cardinal-50">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="border-b border-charcoal-200 px-2 py-4 text-center font-semibold"
            >
              <div className="text-sm font-medium text-charcoal-600">
                {day.toLocaleDateString("vi-VN", { weekday: "short" })}
              </div>
              <div className="mt-1 text-lg text-charcoal-800">
                {day.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 divide-x divide-charcoal-200">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`group relative min-h-[150px] border-b p-4 transition-colors sm:min-h-[200px] ${
                day.toDateString() === new Date().toDateString()
                  ? "bg-cardinal-50/30"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="space-y-2">
                {getEventsForDate(day).map((event) => (
                  <a
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className={`block rounded-lg border px-3 py-2 shadow-sm ${
                      eventStyles[event.type]
                    } transform cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cardinal-500`}
                  >
                    <div className="font-medium leading-snug">
                      {event.title}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <span className="inline-flex items-center rounded bg-white/50 px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                        {event.startDate.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" - "}
                        {event.endDate.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs opacity-80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  </a>
                ))}
              </div>
              {getEventsForDate(day).length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm text-charcoal-500 shadow-sm backdrop-blur-sm">
                    No events
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
