import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { GET_EVENT_BY_SLUG } from "@/features/events/graphql/queries";
import { Calendar, MapPin, Users, Globe, ExternalLink } from "lucide-react";
import type { Event } from "@/features/events";
import { parseDate, formatDatetime, isValidDate } from "@/lib/utils/date";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await getClient().query({
      query: GET_EVENT_BY_SLUG,
      variables: { slug: params.slug },
    });

    if (!data?.post) {
      return {
        title: "Không tìm thấy sự kiện",
        description: "Sự kiện này không tồn tại, hoặc đã bị xóa.",
      };
    }

    const event = data.post as Event;

    return {
      title: `${event.title || "Sự kiện"} | HUST Research Clubs Network`,
      description: event.excerpt || event.title || "Chi tiết sự kiện",
      openGraph: event.featuredImage?.node?.sourceUrl
        ? {
            images: [event.featuredImage.node.sourceUrl],
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Lỗi | HUST Research Clubs Network",
      description: "Đã xảy ra lỗi khi tải thông tin sự kiện",
    };
  }
}

export default async function EventPage({ params }: Props) {
  try {
    const { data } = await getClient().query({
      query: GET_EVENT_BY_SLUG,
      variables: { slug: params.slug },
    });

    if (!data?.post) {
      notFound();
    }

    const event = data.post as Event;
    if (!event?.eventData?.eventTime) {
      notFound();
    }

    const {
      eventTime,
      location,
      delivery,
      capacity,
      registerLink,
      organizer,
      sponsors = [],
    } = event.eventData;

    // Validate and parse dates
    if (!eventTime.eventStartTime || !eventTime.eventEndTime) {
      notFound();
    }

    const startDate = parseDate(eventTime.eventStartTime);
    const endDate = parseDate(eventTime.eventEndTime);

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      notFound();
    }

    const isOnline = delivery === "virtual";

    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-12">
          {/* Banner Section */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-white shadow-xl transition-all hover:shadow-2xl">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-6 lg:w-1/2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                  {event.title || "Sự kiện không có tiêu đề"}
                </h1>
                {event.excerpt && (
                  <p className="text-lg text-slate-200">
                    {event.excerpt.replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </div>
              {event.featuredImage?.node?.sourceUrl && (
                <div className="lg:w-1/3">
                  <Image
                    src={event.featuredImage.node.sourceUrl}
                    alt={event.title || "Ảnh sự kiện"}
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
                    {formatDatetime(startDate)} - {formatDatetime(endDate)}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="h-5 w-5 text-cardinal-500" />
                  <div>
                    <span className="font-medium">Địa điểm</span>
                    <br />
                    {location || "Chưa cập nhật địa điểm"}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  {isOnline ? (
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
                        {capacity && ` - ${capacity} người tham dự`}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Event Content */}
              {event.content && (
                <div className="prose prose-slate prose-headings:text-slate-900 prose-a:text-cardinal-600 hover:prose-a:text-cardinal-500 prose-strong:text-slate-900 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: event.content }} />
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="mt-12 space-y-8 lg:mt-0">
              {/* Event Organization Details */}
              {organizer && (
                <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-slate-900">
                      Đơn vị tổ chức
                    </h3>
                    <div className="flex items-center gap-4">
                      {organizer.logo?.node?.sourceUrl && (
                        <Image
                          src={organizer.logo.node.sourceUrl}
                          alt={organizer.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-cardinal-500 ring-offset-2"
                        />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">
                          {organizer.name}
                        </p>
                        {organizer.email && (
                          <p className="text-sm text-slate-600">
                            {organizer.email}
                          </p>
                        )}
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
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                        >
                          {sponsor.logo?.node?.sourceUrl && (
                            <Image
                              src={sponsor.logo.node.sourceUrl}
                              alt={sponsor.name}
                              width={32}
                              height={32}
                              className="h-8 w-auto object-contain"
                            />
                          )}
                          <div>
                            <p className="font-medium text-slate-900">
                              {sponsor.name}
                            </p>
                            {sponsor.website && (
                              <a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cardinal-600 hover:text-cardinal-500"
                              >
                                Trang web
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Link */}
              {registerLink && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <a
                    href={registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cardinal-600 px-6 py-3 text-white transition-colors hover:bg-cardinal-700"
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
  } catch (error) {
    console.error("Error loading event page:", error);
    notFound();
  }
}
