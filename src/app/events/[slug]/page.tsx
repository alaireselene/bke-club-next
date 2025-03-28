import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { GET_EVENT_BY_SLUG } from "@/features/events/graphql/queries";
import { Calendar, MapPin, Users, Globe, ExternalLink } from "lucide-react";
import type { Event } from "@/features/events";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getClient().query({
    query: GET_EVENT_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.post) {
    return {
      title: "Không tìm thấy sự kiện",
      description: "Sự kiện này không tồn tại, hoặc đã bị xóa.",
    };
  }

  const event = data.post as Event;

  return {
    title: `${event.title} | HUST Research Clubs Network`,
    description: event.excerpt || event.title,
    openGraph: event.featuredImage
      ? {
          images: [event.featuredImage.node.sourceUrl],
        }
      : undefined,
  };
}

export default async function EventPage({ params }: Props) {
  const { data } = await getClient().query({
    query: GET_EVENT_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.post) {
    notFound();
  }

  const event = data.post as Event;
  const startDate = new Date(event.eventData.eventTime.eventStartTime);
  const endDate = new Date(event.eventData.eventTime.eventEndTime);
  const sponsors = event.eventData.sponsors || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="space-y-12">
        {/* Banner Section */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-white shadow-xl transition-all hover:shadow-2xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-6 lg:w-1/2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                {event.title}
              </h1>
              {event.excerpt && (
                <p className="text-lg text-slate-200">
                  {event.excerpt.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </div>
            {event.featuredImage && (
              <div className="lg:w-1/3">
                <Image
                  src={event.featuredImage.node.sourceUrl}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="h-64 w-full rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left Column: Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Event Metadata Bar */}
            <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md sm:grid-cols-3">
              <div className="flex items-start gap-3 text-slate-600">
                <Calendar className="h-5 w-5 text-cardinal-500" />
                <div>
                  <span className="font-medium">Thời gian</span>
                  <br />
                  {new Intl.DateTimeFormat("vi-VN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(startDate)}{" "}
                  -{" "}
                  {new Intl.DateTimeFormat("vi-VN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(endDate)}
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="h-5 w-5 text-cardinal-500" />
                <div>
                  <span className="font-medium">Địa điểm</span>
                  <br />
                  {event.eventData.location}
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                {event.eventData.delivery === "virtual" ? (
                  <>
                    <Globe className="h-5 w-5 text-cardinal-500" />
                    <div>
                      <span className="font-medium">Thể thức</span>
                      <br />
                      Trực tuyến
                    </div>
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5 text-cardinal-500" />
                    <div>
                      <span className="font-medium">Thể thức</span>
                      <br />
                      Trực tiếp
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Event Content */}
            <div className="prose prose-slate prose-headings:text-slate-900 prose-a:text-cardinal-600 hover:prose-a:text-cardinal-500 prose-strong:text-slate-900 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: event.content }} />
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="mt-12 space-y-8 lg:mt-0">
            {/* Event Organization Details */}
            {event.eventData.organizer && (
              <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-slate-900">
                    Đơn vị tổ chức
                  </h3>
                  <div className="flex items-center gap-4">
                    {event.eventData.organizer.logo?.node && (
                      <Image
                        src={event.eventData.organizer.logo.node.sourceUrl}
                        alt={event.eventData.organizer.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-cardinal-500 ring-offset-2"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-900">
                        {event.eventData.organizer.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {event.eventData.organizer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sponsors */}
            {sponsors.length > 0 && (
              <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-slate-900">
                    Được tài trợ bởi
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {sponsors.map((sponsor, index) => (
                      <a
                        key={index}
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 transition hover:bg-slate-100"
                      >
                        {sponsor.logo && (
                          <Image
                            src={sponsor.logo.node.sourceUrl}
                            alt={sponsor.name}
                            width={32}
                            height={32}
                            className="h-8 w-auto object-contain"
                          />
                        )}
                        <span className="text-sm font-medium text-slate-600">
                          {sponsor.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Registration Link */}
            {event.eventData.registerLink && (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <a
                  href={event.eventData.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cardinal-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-cardinal-500 focus:ring-2 focus:ring-cardinal-500 focus:ring-offset-2 focus:outline-none"
                >
                  Đăng ký tham gia
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
