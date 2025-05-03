import { Metadata } from "next";
import { directus, Facility } from "@/lib/directus"; // Import directus client and Facility type
import { readItems } from "@directus/sdk"; // Import readItems function
import { FacilityGrid } from "@/features/facilities/components/FacilityGrid"; // Keep FacilityGrid import
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cơ sở vật chất | BKE Club",
  description: "Thông tin về các cơ sở vật chất của BKE Club",
};

export default async function FacilitiesPage() {
  // Fetch data using Directus SDK
  const facilitiesData = await directus.request(readItems('facility', {
    fields: ['*'], // Fetch all fields defined in the schema for 'facility'
    // Add any necessary sorting or filtering here if needed
  }));

  const facilities = facilitiesData as Facility[]; // Assert type based on import from directus.ts

  return (
    <div className="container mx-auto px-4 space-y-4">
      <h1 className="text-3xl font-bold mb-8">Cơ sở vật chất</h1>

      {/* Notes Section */}
      <div className="mt-12 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Lưu ý khi mượn phòng</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Sinh viên vui lòng điền đầy đủ thông tin vào biểu mẫu đăng ký.</li>
          <li>Kiểm tra lịch trống của phòng trước khi đăng ký.</li>
          <li>Giữ gìn vệ sinh chung và bảo quản tài sản trong phòng.</li>
          <li>Liên hệ ban quản lý nếu có bất kỳ vấn đề gì phát sinh.</li>
          <li>Hoàn trả phòng đúng giờ và đảm bảo tình trạng phòng như ban đầu.</li>
        </ul>
        <a href="https://shorturl.at/KUWlK" target="_blank" rel="noopener noreferrer">
          <Button>Đăng ký mượn phòng tại đây</Button>
        </a>
      </div>

      <FacilityGrid facilities={facilities} />
    </div>
  );
}
