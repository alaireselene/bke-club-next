"use client";
import {
  Settings2,
  Cpu,
  FlaskConical, // Changed from PillBottle for better representation
  ChartPie,
  Zap, // Changed from ZapIcon
  BookOpen,
  Globe2,
  Calculator,
  Microscope,
  Wallet, // Kept Wallet, though not used in current data
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils";

// Define a mapping for colors to Tailwind classes (using theme colors where possible)
// This assumes you might want specific colors, otherwise map to primary, secondary, accent etc.
const colorMap: { [key: string]: string } = {
  "bg-blue-500": "bg-info/10 text-info", // Map blue to info
  "bg-purple-500": "bg-secondary/10 text-secondary", // Map purple to secondary
  "bg-green-500": "bg-success/10 text-success", // Map green to success
  "bg-amber-500": "bg-warning/10 text-warning", // Map amber to warning
  "bg-red-500": "bg-destructive/10 text-destructive", // Map red to destructive
  "bg-emerald-500": "bg-success/10 text-success", // Map emerald to success
  "bg-indigo-500": "bg-secondary/10 text-secondary", // Map indigo to secondary
  "bg-cyan-500": "bg-info/10 text-info", // Map cyan to info
  "bg-orange-500": "bg-accent/10 text-accent", // Map orange to accent (adjust if needed)
};

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
    icon: "hammer", // Note: 'hammer' icon key maps to Zap below
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
  flask: FlaskConical, // Updated icon
  chartPieSlice: ChartPie,
  hammer: Zap, // Updated icon
  bookOpen: BookOpen,
  globe2: Globe2,
  calculator: Calculator,
  microscope: Microscope,
  wallet: Wallet,
} as const;

export function ResearchAreas() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden"> {/* Adjusted padding */}
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-cardinal-50/20" />

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-50"> {/* Reduced opacity */}
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
                  stroke="rgba(206, 22, 40, 0.05)" // Use theme color variable if possible later
                  strokeWidth="0.5"
                  fill="none"
                >
                  {/* Removed SVG animation for performance, keep it static */}
                </path>
                <circle cx="25" cy="25" r="1" fill="rgba(206, 22, 40, 0.05)">
                  {/* Removed SVG animation */}
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
        <div className="text-center mb-12 sm:mb-16"> {/* Adjusted margin */}
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"> {/* Adjusted styles */}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2" />
            Nghiên cứu &amp; Phát triển
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> {/* Adjusted styles */}
            Lĩnh vực nghiên cứu
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"> {/* Adjusted styles */}
            Khám phá các lĩnh vực nghiên cứu đa dạng tại các câu lạc bộ trong
            mạng lưới
          </p>
        </div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {researchAreas.map((area) => {
            const Icon = icons[area.icon as keyof typeof icons];
            const iconColorClasses = colorMap[area.color] || "bg-muted/10 text-muted-foreground";
            return (
              <Card
                key={area.title}
                className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200"
                tabIndex={0}
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6 pb-2">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group-hover:scale-105 group-focus-within:scale-105",
                      iconColorClasses
                    )}
                  >
                    {Icon ? <Icon className="w-6 h-6" /> : null}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {area.title}
                    </CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground pt-1">
                      {area.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-2 px-6 pb-6">
                  {/* Schools List */}
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    {area.schools.map((school) => (
                      <div
                        key={school.name}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="text-muted-foreground line-clamp-1">{school.name}</span>
                        {school.code && (
                          <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded text-xs sm:text-sm">
                            {school.code}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
