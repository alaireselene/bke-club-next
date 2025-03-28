"use client";
import {
  Settings2,
  Cpu,
  PillBottle,
  ChartPie,
  ZapIcon,
  BookOpen,
  Globe2,
  Calculator,
  Microscope,
  Wallet,
} from "lucide-react";

const researchAreas = [
  {
    title: "Cơ khí & Sản xuất",
    description: "Công nghệ chế tạo máy, tự động hóa và robotics",
    icon: "settings2",
    color: "bg-blue-500",
    schools: [{ name: "Trường Cơ khí", code: "SME" }],
  },
  {
    title: "Công nghệ số",
    description: "AI, IoT, phần mềm và an toàn thông tin",
    icon: "cpu",
    color: "bg-purple-500",
    schools: [
      { name: "Trường Công nghệ thông tin & Truyền thông", code: "SOICT" },
    ],
  },
  {
    title: "Hóa học & Khoa học sự sống",
    description: "Công nghệ sinh học và vật liệu mới",
    icon: "flask",
    color: "bg-green-500",
    schools: [{ name: "Trường Hóa & KHSS", code: "SCLS" }],
  },
  {
    title: "Kinh tế & Quản lý",
    description: "Quản trị doanh nghiệp và kinh tế số",
    icon: "chartPieSlice",
    color: "bg-amber-500",
    schools: [
      { name: "Trường Kinh tế", code: "SEM" },
      { name: "BK Fintech", code: "" },
    ],
  },
  {
    title: "Điện - Điện tử",
    description: "Vi mạch, năng lượng và điều khiển",
    icon: "hammer",
    color: "bg-red-500",
    schools: [{ name: "Trường Điện - Điện tử", code: "SEEE" }],
  },
  {
    title: "Giáo dục & Đào tạo",
    description: "Công nghệ giáo dục và phương pháp dạy học",
    icon: "bookOpen",
    color: "bg-emerald-500",
    schools: [{ name: "Khoa Khoa học & CNGD", code: "FED" }],
  },
  {
    title: "Ngôn ngữ & Văn hóa",
    description: "Nghiên cứu ngôn ngữ và giao tiếp liên văn hóa",
    icon: "globe2",
    color: "bg-indigo-500",
    schools: [{ name: "Khoa Ngoại ngữ", code: "FOFL" }],
  },
  {
    title: "Toán học & Mô phỏng",
    description: "Toán ứng dụng và khoa học máy tính",
    icon: "calculator",
    color: "bg-cyan-500",
    schools: [{ name: "Khoa Toán - Tin", code: "FAMI" }],
  },
  {
    title: "Vật liệu tiên tiến",
    description: "Vật liệu nano và composite",
    icon: "microscope",
    color: "bg-orange-500",
    schools: [
      { name: "Trường Vật liệu", code: "SMSE" },
      { name: "Khoa VLKT", code: "SEP" },
    ],
  },
].sort((a, b) => a.title.localeCompare(b.title, "vi"));

const icons = {
  settings2: Settings2,
  cpu: Cpu,
  flask: PillBottle,
  chartPieSlice: ChartPie,
  hammer: ZapIcon,
  bookOpen: BookOpen,
  globe2: Globe2,
  calculator: Calculator,
  microscope: Microscope,
  wallet: Wallet,
} as const;

export function ResearchAreas() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-cardinal-50/20" />

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0">
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="circuit-pattern"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 25 L 25 25 M 25 0 L 25 25"
                  stroke="rgba(206, 22, 40, 0.05)"
                  strokeWidth="0.5"
                  fill="none"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.05;0.1;0.05"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>
                <circle cx="25" cy="25" r="1" fill="rgba(206, 22, 40, 0.05)">
                  <animate
                    attributeName="fill-opacity"
                    values="0.05;0.1;0.05"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#circuit-pattern)"
            />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-cardinal-50 text-cardinal-600 text-sm font-medium">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cardinal-500 mr-2" />
            Nghiên cứu & Phát triển
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cardinal-700 to-cardinal-500 bg-clip-text text-transparent">
            Lĩnh vực nghiên cứu
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Khám phá các lĩnh vực nghiên cứu đa dạng tại các câu lạc bộ trong
            mạng lưới
          </p>
        </div>

        {/* Research Areas Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area) => {
            const Icon = icons[area.icon as keyof typeof icons];
            return (
              <div key={area.title} className="group">
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-sm">
                  {/* Card Background */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
                    <div className="absolute inset-0" />
                  </div>

                  {/* Card Content */}
                  <div className="relative space-y-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${area.color.replace(
                        "bg-",
                        "bg-opacity-10 text-"
                      )}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {area.title}
                    </h3>
                    <p className="text-slate-600">{area.description}</p>

                    {/* Schools List */}
                    <div className="pt-4 space-y-2">
                      {area.schools.map((school) => (
                        <div
                          key={school.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-600">{school.name}</span>
                          {school.code && (
                            <span className="font-mono text-cardinal-600 bg-cardinal-50 px-2 py-0.5 rounded">
                              {school.code}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cardinal-400 to-transparent" />
                    <div className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cardinal-400 to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
