import { Metadata } from "next";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { ResearchAreas } from "@/app/components/about/ResearchAreas";
import { Timeline } from "@/app/components/about/Timeline";
import { ContactInfo } from "@/app/components/about/ContactInfo";

export const metadata: Metadata = {
  title: "Về chúng tôi | HUST Research Clubs Network",
  description:
    "Tìm hiểu về Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học HUST",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Về chúng tôi"
        description="Thúc đẩy đổi mới sáng tạo và nghiên cứu trong cộng đồng sinh viên Đại học Bách Khoa Hà Nội"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-base-content/70">
              Nuôi dưỡng sự đổi mới và xuất sắc trong nghiên cứu giữa các sinh
              viên tại Đại học Bách khoa Hà Nội thông qua mạng lưới hợp tác, cố
              vấn và cơ hội nghiên cứu thực tế.
            </p>
          </section>

          <ResearchAreas />

          <Timeline />

          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
