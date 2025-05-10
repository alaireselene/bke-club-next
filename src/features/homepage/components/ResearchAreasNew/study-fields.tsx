"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStudyFields } from "@/lib/mock-api"

export default function StudyFields() {
  const [studyFields, setStudyFields] = useState<any[]>([])
  const [selectedField, setSelectedField] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudyFields = async () => {
      try {
        const data = await getStudyFields()
        setStudyFields(data)
      } catch (error) {
        console.error("Error fetching study fields:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudyFields()
  }, [])

  const handleFieldClick = (id: number) => {
    setSelectedField(selectedField === id ? null : id)
  }

  const selectedFieldData = selectedField ? studyFields.find((field) => field.id === selectedField) : null

  if (loading) {
    return (
      <section className="container mx-auto my-12 border border-dashed border-gray-300 rounded-lg overflow-hidden">
        <div className="relative h-[500px] flex animate-pulse">
          <div className="absolute inset-0 bg-gray-200"></div>
          <div className="relative z-10 w-full p-6">
            <div className="h-6 bg-gray-300 w-48 rounded mb-8"></div>
            <div className="flex h-full">
              <div className="w-1/4"></div>
              <div className="w-3/4 flex">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="flex-1 bg-gray-300 mx-1"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto my-12 border border-dashed border-gray-300 rounded-lg overflow-hidden">
      <div className="relative h-[500px] flex">
        {/* Background Image - Covers the entire section */}
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=800&width=1200" alt="Lĩnh vực nghiên cứu" fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col">
          <h2 className="text-xl font-bold text-white p-6">Lĩnh vực nghiên cứu</h2>

          <div className="flex-1 flex">
            {/* Left side - empty or can contain additional content */}
            <div className="w-1/4 p-4"></div>

            {/* Right side - Study fields columns */}
            <div className="w-3/4 flex">
              {selectedField ? (
                // Expanded view when a field is selected
                <div
                  className={cn(
                    "flex-1 p-6 flex flex-col justify-center items-center text-white relative",
                    selectedFieldData?.color,
                  )}
                >
                  <button
                    onClick={() => setSelectedField(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                    aria-label="Close"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>

                  <div className="text-center max-w-lg">
                    <div className="text-5xl mb-4">{selectedFieldData?.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{selectedFieldData?.name}</h3>
                    <p className="text-lg">{selectedFieldData?.description}</p>
                  </div>
                </div>
              ) : (
                // Columns view when no field is selected
                <>
                  {studyFields.map((field) => (
                    <div
                      key={field.id}
                      className={cn(
                        "flex-1 flex flex-col items-center justify-between p-4 cursor-pointer transition-all hover:opacity-90",
                        field.color,
                      )}
                      onClick={() => handleFieldClick(field.id)}
                    >
                      <div className="text-3xl text-white mb-4">{field.icon}</div>
                      <div className="text-white font-medium text-center">{field.name}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
