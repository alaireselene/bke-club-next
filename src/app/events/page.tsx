import { Metadata } from "next";
import { db } from "@/db";
import { event } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { EventCard } from "@/app/components/ui/EventCard";

export const metadata: Metadata = {
  title: "Sự kiện | HUST Research Clubs Network",
  description: "Các sự kiện được tổ chức bởi Thành viên Mạng lưới",
};

async function getEventsData() {
  const events = await db.select().from(event).orderBy(event.startDate);
  return {
    events,
  };
}

export default async function EventsPage() {
  const { events } = await getEventsData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <PageHeader
          title="Sự kiện"
          description="Các sự kiện được tổ chức bởi Thành viên Mạng lưới"
        />

        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 border border-base-200 shadow-sm text-center">
            <div className="card-body">
              <p className="text-base-content/70">
                Hiện tại không có sự kiện nào sắp diễn ra. Vui lòng kiểm tra lại
                sau!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
