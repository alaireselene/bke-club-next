"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Mock conference data for carousel
const conferenceData = [
  {
    id: 1,
    title: "HỘI NGHỊ SINH VIÊN NGHIÊN CỨU KHOA HỌC 2024 - 2025",
    description: "Sân chơi lý tưởng dành cho sinh viên yêu thích nghiên cứu khoa học",
    image: "/placeholder.svg?height=400&width=600&text=Conference+1",
    date: "2025-06-15T00:00:00.000Z",
    location: "Trường Đại học Kinh tế, Đại học Quốc gia Hà Nội",
    registrationLink: "#",
  },
  {
    id: 2,
    title: "WORKSHOP KHỞI NGHIỆP SÁNG TẠO 2025",
    description: "Cơ hội kết nối với các chuyên gia hàng đầu trong lĩnh vực khởi nghiệp",
    image: "/placeholder.svg?height=400&width=600&text=Conference+2",
    date: "2025-07-20T00:00:00.000Z",
    location: "Trung tâm Đổi mới Sáng tạo, Đại học Bách Khoa Hà Nội",
    registrationLink: "#",
  },
  {
    id: 3,
    title: "HACKATHON CÔNG NGHỆ SINH VIÊN 2025",
    description: "Thử thách 48 giờ để phát triển giải pháp công nghệ cho các vấn đề xã hội",
    image: "/placeholder.svg?height=400&width=600&text=Conference+3",
    date: "2025-08-10T00:00:00.000Z",
    location: "Innovation Hub, Khu Công nghệ cao Hòa Lạc",
    registrationLink: "#",
  },
]

export default function Conference() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % conferenceData.length)
  }, [])

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + conferenceData.length) % conferenceData.length)
  }

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    setLoading(false)
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [nextSlide])

  if (loading) {
    return (
      <section className="container mx-auto my-12 border border-gray-300 rounded-lg p-6 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 w-24 mb-2 rounded"></div>
            <div className="h-6 bg-gray-200 w-full mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 w-3/4 mb-4 rounded"></div>
            <div className="h-8 bg-gray-200 w-32 rounded"></div>
          </div>
          <div className="w-24 h-24 bg-gray-200 rounded"></div>
        </div>
      </section>
    )
  }

  const conference = conferenceData[currentIndex]

  return (
    <section className="container mx-auto my-12 border border-gray-300 rounded-lg p-6 relative">
      {/* Carousel container */}
      <div className="relative min-h-[150px]">
        {/* Current slide */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 uppercase">HỘI NGHỊ</h3>
            <h2 className="text-2xl font-bold mb-4">{conference.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{conference.description}</p>
            <a
              href={conference.registrationLink}
              className="px-6 py-2 bg-white border border-red-500 text-red-500 rounded-md inline-block"
            >
              Xem thêm
            </a>
          </div>
          <div className="w-24 h-24 relative">
            <Image
              src={conference.image || "/placeholder.svg"}
              alt={conference.title}
              fill
              className="object-cover rounded"
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-end mt-4">
        {conferenceData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full mx-1 transition-all",
              currentIndex === index ? "bg-black w-4" : "bg-gray-300",
            )}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  )
}
