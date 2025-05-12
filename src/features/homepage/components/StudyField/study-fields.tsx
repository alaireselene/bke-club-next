"use client"

import { useState } from "react"
import { X, Code2, Cpu, CircuitBoard, GraduationCap, FlaskConical, LineChart, Languages, Calculator, Microscope } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the type for study fields
interface StudyField {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  color: string
  school: string
  code: string
}

// Hard-coded study fields data
const STUDY_FIELDS: StudyField[] = [
  {
    id: 1,
    name: "Công nghệ số",
    description: "AI, IoT, phần mềm và an toàn thông tin",
    icon: <Code2 className="w-12 h-12" />,
    color: "bg-gradient-to-br from-cardinal-600 to-cardinal-500",
    school: "Trường Công nghệ thông tin & Truyền thông",
    code: "SOICT"
  },
  {
    id: 2,
    name: "Cơ khí & Sản xuất",
    description: "Công nghệ chế tạo máy, tự động hóa và robotics",
    icon: <Cpu className="w-12 h-12" />,
    color: "bg-gradient-to-br from-navy-600 to-navy-500",
    school: "Trường Cơ khí",
    code: "SME"
  },
  {
    id: 3,
    name: "Điện - Điện tử",
    description: "Vi mạch, năng lượng và điều khiển",
    icon: <CircuitBoard className="w-12 h-12" />,
    color: "bg-gradient-to-br from-sunflower-500 to-sunflower-400",
    school: "Trường Điện - Điện tử",
    code: "SEEE"
  },
  {
    id: 4,
    name: "Giáo dục & Đào tạo",
    description: "Công nghệ giáo dục và phương pháp dạy học",
    icon: <GraduationCap className="w-12 h-12" />,
    color: "bg-gradient-to-br from-crimson-600 to-crimson-500",
    school: "Khoa Khoa học & CNGD",
    code: "FED"
  },
  {
    id: 5,
    name: "Hóa học & Khoa học sự sống",
    description: "Công nghệ sinh học và vật liệu mới",
    icon: <FlaskConical className="w-12 h-12" />,
    color: "bg-gradient-to-br from-tangerine-500 to-tangerine-400",
    school: "Trường Hóa & KHSS",
    code: "SCLS"
  },
  {
    id: 6,
    name: "Kinh tế & Quản lý",
    description: "Quản trị doanh nghiệp và kinh tế số",
    icon: <LineChart className="w-12 h-12" />,
    color: "bg-gradient-to-br from-navy-500 to-navy-400",
    school: "Trường Kinh tế",
    code: "SEM"
  },
  {
    id: 7,
    name: "Ngôn ngữ & Văn hóa",
    description: "Nghiên cứu ngôn ngữ và giao tiếp liên văn hóa",
    icon: <Languages className="w-12 h-12" />,
    color: "bg-gradient-to-br from-cardinal-500 to-cardinal-400",
    school: "Khoa Ngoại ngữ",
    code: "FOFL"
  },
  {
    id: 8,
    name: "Toán học & Mô phỏng",
    description: "Toán ứng dụng và khoa học máy tính",
    icon: <Calculator className="w-12 h-12" />,
    color: "bg-gradient-to-br from-sunflower-400 to-sunflower-300",
    school: "Khoa Toán - Tin",
    code: "FAMI"
  },
  {
    id: 9,
    name: "Vật liệu tiên tiến",
    description: "Vật liệu nano và composite",
    icon: <Microscope className="w-12 h-12" />,
    color: "bg-gradient-to-br from-crimson-500 to-crimson-400",
    school: "Trường Vật liệu",
    code: "SMSE"
  }
]

export default function StudyFields() {
  const [selectedField, setSelectedField] = useState<number | null>(null)

  const handleFieldClick = (id: number) => {
    setSelectedField(selectedField === id ? null : id)
  }

  const selectedFieldData = selectedField ? STUDY_FIELDS.find((field) => field.id === selectedField) : null

  return (
    <section className="section-container">
      <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-background">
        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="p-8">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-accent/10 text-accent text-sm font-medium backdrop-blur-sm border border-accent/20">
              <span className="inline-block h-2 w-2 rounded-full bg-accent mr-2"></span>
              Lĩnh vực nghiên cứu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-primary">
              Các lĩnh vực nghiên cứu trọng tâm
            </h2>
          </div>

          <div className="flex-1 flex">
            <div className="w-full px-8 pb-8">
              {selectedField ? (
                // Expanded view when a field is selected
                <div
                  className={cn(
                    "flex-1 rounded-2xl p-8 flex flex-col justify-center items-center text-white relative backdrop-blur-sm border border-white/10",
                    selectedFieldData?.color,
                  )}
                >
                  <button
                    onClick={() => setSelectedField(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="Close"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>

                  <div className="text-center max-w-lg w-full">
                    <div className="flex justify-center items-center mb-6 text-white">
                      {selectedFieldData?.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-white">{selectedFieldData?.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{selectedFieldData?.school} ({selectedFieldData?.code})</p>
                    <p className="text-lg text-white/90 leading-relaxed">{selectedFieldData?.description}</p>
                  </div>
                </div>
              ) : (
                // Scrollable columns view when no field is selected
                <div className="relative">
                  {/* Scrollable container */}
                  <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
                    <div className="flex gap-4 min-w-max md:min-w-0">
                      {STUDY_FIELDS.map((field) => (
                        <div
                          key={field.id}
                          className={cn(
                            "flex-none w-[200px] md:flex-1 rounded-2xl p-6 flex flex-col items-center justify-between cursor-pointer hover:bg-opacity-90 backdrop-blur-sm border border-white/10",
                            field.color,
                          )}
                          onClick={() => handleFieldClick(field.id)}
                        >
                          <div className="flex justify-center items-center w-full mb-4 text-white">
                            {field.icon}
                          </div>
                          <div className="text-white font-medium text-center text-lg writing-vertical-rl">
                            {field.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
