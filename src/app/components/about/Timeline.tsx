interface TimelineEvent {
  year: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    year: "2020",
    description: "Thành lập mạng lưới với 3 câu lạc bộ đầu tiên",
  },
  {
    year: "2022",
    description: "Mở rộng thành 8 nhóm nghiên cứu chuyên sâu",
  },
  {
    year: "2024",
    description: "Thiết lập quan hệ hợp tác nghiên cứu quốc tế",
  },
];

export function Timeline() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Lịch sử phát triển</h2>
      <div className="space-y-4">
        <p className="text-base-content/70">
          Thành lập năm 2025, Mạng lưới CLB Sinh viên nghiên cứu khoa học hoạt
          động với mục tiêu tạo ra một môi trường học thuật sôi động và thúc đẩy
          sự sáng tạo trong cộng đồng sinh viên Đại học Bách khoa Hà Nội.
        </p>

        <div className="divider" />

        <div className="flex flex-col md:flex-row justify-between gap-8">
          {events.map((event) => (
            <div key={event.year} className="text-center md:flex-1">
              <div className="text-primary text-lg font-medium">
                {event.year}
              </div>
              <div className="text-sm text-base-content/70 mt-1">
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
