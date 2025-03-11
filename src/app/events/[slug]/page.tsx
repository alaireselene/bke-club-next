import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { event, type Event } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { EventBanner } from "@/app/components/events/EventBanner";
import { EventMetadataBar } from "@/app/components/events/EventMetadataBar";
import { EventContent } from "@/app/components/events/EventContent";
import { EventOrganization } from "@/app/components/events/EventOrganization";

interface Props {
  params: {
    slug: string;
  };
}

interface EventPageData {
  event: Event;
}

async function getEventData(slug: string): Promise<EventPageData | null> {
  const events = await db.select().from(event).where(eq(event.title, slug));
  const eventData = events[0];

  if (!eventData) {
    return null;
  }

  return {
    event: eventData,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getEventData(params.slug);

  if (!data?.event) {
    return {
      title: "Sự kiện không tồn tại | HUST Research Clubs Network",
    };
  }

  return {
    title: `${data.event.title} | HUST Research Clubs Network`,
    description: data.event.summary.slice(0, 160),
  };
}

export default async function EventPage({ params }: Props) {
  const data = await getEventData(params.slug);

  if (!data?.event) {
    notFound();
  }

  return (
    <main>
      <PageHeader title={data.event.title || "Sự kiện"} />

      <EventBanner
        title={data.event.title || ""}
        summary={data.event.summary || ""}
        imageUrl={data.event.imageUrl || undefined}
        categoryName={data.event.type}
      />

      <div className="container mx-auto px-4 py-16">
        <EventMetadataBar
          startDate={data.event.startDate}
          endDate={data.event.endDate}
          location={data.event.location || ""}
          isOnline={false}
        />

        <EventContent
          content={data.event.description || ""}
          isAiTranslated={false}
        />

        <EventOrganization host={{ name: "TBD" }} sponsors={[]} />
      </div>
    </main>
  );
}
