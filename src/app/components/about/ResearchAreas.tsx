interface ResearchArea {
  title: string;
  description: string;
}

const areas: ResearchArea[] = [
  {
    title: "Trí tuệ nhân tạo",
    description:
      "Exploring cutting-edge AI technologies and applications in real-world scenarios.",
  },
  {
    title: "Công nghệ bền vững",
    description: "Developing eco-friendly solutions for a sustainable future.",
  },
  {
    title: "Robotics & Tự động hóa",
    description:
      "Building next-generation robotics systems and automated solutions.",
  },
  {
    title: "Chuyển đổi số",
    description:
      "Creating digital solutions that transform traditional processes.",
  },
];

export function ResearchAreas() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">
        Các lĩnh vực nghiên cứu trọng tâm
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <div
            key={area.title}
            className="card bg-base-100 border border-base-200 shadow-sm"
          >
            <div className="card-body">
              <h3 className="card-title text-primary">{area.title}</h3>
              <p className="text-base-content/70">{area.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
