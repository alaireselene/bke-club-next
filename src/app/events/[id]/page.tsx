import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { directus, Event } from "@/lib/directus"; // Import directus client and Event type
import { readItem} from "@directus/sdk"; // Import SDK functions
import { Calendar, MapPin, Users, Globe, ExternalLink } from "lucide-react";
// Event type is already updated in features/events/types.ts
import { formatDatetime, isValidDate } from "@/lib/utils/date"; // Keep existing date utils
import { parseISO } from "date-fns"; // Import parseISO directly from date-fns
import { createExcerpt } from "@/lib/utils/contentModify"; // Import excerpt util

// Assuming the directory is renamed from [slug] to [id]
interface Props {
  params: Promise<{ id: string }>; // Expect 'id' instead of 'slug'
}

// Helper function to fetch event data
async function getEventData(id: string): Promise<Event | null> {
  try {
    const eventData = await directus.request(readItem('event', id, {
      fields: ['*'], // Fetch all fields
    }));
    return eventData as Event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null; // Return null if event not found or other error
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const event = await getEventData(params.id);

  if (!event) {
    return {
      title: "Không tìm thấy sự kiện",
      description: "Sự kiện này không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${event.title || "Sự kiện"} | HUST Research Clubs Network`,
    description: createExcerpt(event.description, 25) || "Chi tiết sự kiện", // Use excerpt util
    // Remove openGraph image
    openGraph: undefined,
  };
}

export default async function EventPage(props: Props) {
  const params = await props.params;
  try {
    const event = await getEventData(params.id);

    if (!event) {
      notFound();
    }

    // Destructure directly from the Directus Event object
    const {
      title,
      description,
      event_start,
      event_end,
      location,
      delivery,
      capacity,
      register_url,
      organizer_name,
      organizer_email,
      organizer_logo_url,
      sponsor, // This is a JSON field
    } = event;

    // Validate and parse dates
    // Validate and parse dates from event_start and event_end
    if (!event_start || !event_end) {
      console.error(`Event ${event.id} missing start or end date.`);
      notFound(); // Or handle differently
    }

    const startDate = parseISO(event_start); // Assuming ISO string
    const endDate = parseISO(event_end);     // Assuming ISO string

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      console.error(`Event ${event.id} has invalid start or end date.`);
      notFound(); // Or handle differently
    }

    const isOnline = delivery === "virtual"; // Assuming 'virtual' is the value used

    // Parse sponsors JSON
    let sponsors: Array<{ name: string; logoUrl?: string; website?: string }> = [];
    try {
      const parsedSponsors = typeof sponsor === 'string' ? JSON.parse(sponsor) : sponsor;
      if (Array.isArray(parsedSponsors)) {
        // Assuming structure matches { name: string, logoUrl?: string, website?: string }
        sponsors = parsedSponsors;
      }
    } catch (e) {
      console.error("Error parsing sponsors JSON for event:", event.id, e);
    }

    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-12">
          {/* Banner Section */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-white shadow-xl transition-all hover:shadow-2xl">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-6 lg:w-1/2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                  {title || "Sự kiện không có tiêu đề"} {/* Use title */}
                </h1>
                {/* Use generated excerpt from description */}
                <p className="text-lg text-slate-200">
                  {createExcerpt(description)}
                </p>
              </div>
              {/* Removed featuredImage */}
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
                    {location || "Chưa cập nhật"} {/* Use location */}
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
                        {capacity ? ` - ${capacity} người tham dự` : ""} {/* Use capacity */}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Event Content */}
              {/* Use description, assuming HTML */}
              {description && (
                <div className="prose prose-slate prose-headings:text-slate-900 prose-a:text-cardinal-600 hover:prose-a:text-cardinal-500 prose-strong:text-slate-900 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="mt-12 space-y-8 lg:mt-0">
              {/* Event Organization Details */}
              {/* Use organizer_name, organizer_email, organizer_logo_url */}
              {organizer_name && (
                <div className="space-y-8 rounded-xl border border-slate-200 bg-white p-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-slate-900">
                      Đơn vị tổ chức
                    </h3>
                    <div className="flex items-center gap-4">
                      {organizer_logo_url && (
                        <Image
                          src={organizer_logo_url}
                          alt={organizer_name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-cardinal-500 ring-offset-2"
                        />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">
                          {organizer_name}
                        </p>
                        {organizer_email && (
                          <p className="text-sm text-slate-600">
                            {organizer_email}
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
                      {/* Use parsed sponsors array */}
                      {sponsors.map((sponsor, index) => (
                        <div
                          key={index} // Consider using a more stable key if available in sponsor data
                          className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                        >
                          {sponsor.logoUrl && ( // Assuming logoUrl field in JSON
                            (<Image
                              src={sponsor.logoUrl}
                              alt={sponsor.name}
                              width={32}
                              height={32}
                              className="h-8 w-auto object-contain"
                            />)
                          )}
                          <div>
                            <p className="font-medium text-slate-900">
                              {sponsor.name}
                            </p>
                            {sponsor.website && ( // Assuming website field in JSON
                              (<a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cardinal-600 hover:text-cardinal-500"
                              >Trang web
                                                              </a>)
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Link */}
              {/* Use register_url */}
              {register_url && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <a
                    href={register_url}
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
