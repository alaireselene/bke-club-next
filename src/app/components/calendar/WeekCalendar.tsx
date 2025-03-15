"use client";

import { useState } from "react";

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
  workshop: "bg-green-100 border-green-300 text-green-800",
  competition: "bg-blue-100 border-blue-300 text-blue-800",
  cultural: "bg-purple-100 border-purple-300 text-purple-800",
  research: "bg-orange-100 border-orange-300 text-orange-800",
  synposium: "bg-teal-100 border-teal-300 text-teal-800",
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
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            onClick={previousWeek}
          >
            Tuần trước
          </button>
          <span className="text-lg font-semibold">
            {currentWeek.toLocaleDateString("vi-VN", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            onClick={nextWeek}
          >
            Tuần sau
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border shadow">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="border-b px-2 py-4 text-center font-semibold"
            >
              <div className="text-sm text-gray-600">
                {day.toLocaleDateString("vi-VN", { weekday: "short" })}
              </div>
              <div className="text-lg">
                {day.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="relative min-h-[200px] border-r border-b p-2"
            >
              {getEventsForDate(day).map((event) => (
                <a
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className={`mb-2 block rounded border p-2 ${
                    eventStyles[event.type]
                  } cursor-pointer transition-all hover:shadow-md`}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-sm">
                    {event.startDate.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {event.endDate.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-sm">{event.location}</div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
