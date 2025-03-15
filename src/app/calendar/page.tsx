import { PageHeader } from "../components/ui/PageHeader";
import { WeekCalendar } from "../components/calendar/WeekCalendar";

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

const typeLabels: Record<EventType, string> = {
  workshop: "Hội thảo",
  competition: "Cuộc thi",
  cultural: "Văn hóa",
  research: "Nghiên cứu",
  synposium: "Hội nghị",
};

// Mock events
const mockEvents = [
  {
    id: "1",
    title: "Workshop Lập trình Embedded",
    slug: "workshop-lap-trinh-embedded",
    startDate: new Date(2025, 2, 15, 9, 0), // March 15, 2025, 9:00 AM
    endDate: new Date(2025, 2, 15, 12, 0),
    location: "Phòng 201, Tòa nhà B1",
    type: "workshop" as EventType,
  },
  {
    id: "2",
    title: "Cuộc thi Robot Line Follower",
    slug: "cuoc-thi-robot-line-follower",
    startDate: new Date(2025, 2, 16, 14, 0), // March 16, 2025, 2:00 PM
    endDate: new Date(2025, 2, 16, 17, 0),
    location: "Sân B1",
    type: "competition" as EventType,
  },
  {
    id: "3",
    title: "Giao lưu văn hóa Việt - Nhật",
    slug: "giao-luu-van-hoa-viet-nhat",
    startDate: new Date(2025, 2, 17, 15, 0), // March 17, 2025, 3:00 PM
    endDate: new Date(2025, 2, 17, 18, 0),
    location: "Hội trường C1",
    type: "cultural" as EventType,
  },
  {
    id: "4",
    title: "Nghiên cứu IoT trong nông nghiệp",
    slug: "nghien-cuu-iot-trong-nong-nghiep",
    startDate: new Date(2025, 2, 18, 8, 30), // March 18, 2025, 8:30 AM
    endDate: new Date(2025, 2, 18, 11, 30),
    location: "Phòng Lab IoT",
    type: "research" as EventType,
  },
  {
    id: "5",
    title: "Hội nghị Khoa học Trẻ",
    slug: "hoi-nghi-khoa-hoc-tre",
    startDate: new Date(2025, 2, 19, 13, 0), // March 19, 2025, 1:00 PM
    endDate: new Date(2025, 2, 19, 17, 0),
    location: "Hội trường B2",
    type: "synposium" as EventType,
  },
];

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <PageHeader
          title="Lịch công tác"
          description="Lịch công tác của Mạng lưới"
        />
      </div>

      <WeekCalendar events={mockEvents} />

      {/* Legend */}
      <div className="mt-6 flex justify-end gap-4">
        {Object.entries(typeLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded border ${
                eventStyles[type as EventType]
              }`}
            ></div>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
