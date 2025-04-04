"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"; // Import Card components

export function QuickAbout() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden"> {/* Adjusted padding */}
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50/50 to-white"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,51,102,0.05)_0%,transparent_70%)]"></div>

        {/* DNA Double Helix Animation */}
        <div className="absolute right-0 top-1/4 h-[300px] w-[100px] opacity-10 hidden lg:block"> {/* Hide on smaller screens */}
          <div className="absolute h-full w-[2px] left-1/2 bg-gradient-to-b from-navy-300/0 via-navy-400/50 to-navy-300/0" />
          {[...Array(15)].map((_, i) => (
            <div
              key={`dna-${i}`}
              className="absolute w-10 h-[2px]"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `translateX(-50%) rotate(${i % 2 ? 30 : -30}deg)`,
                background: `rgba(0, 51, 102, ${0.1 + (i % 3) * 0.1})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Text */}
          <div className="space-y-8">
            <div className="space-y-4 sm:space-y-6"> {/* Adjusted spacing */}
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-navy-700 to-navy-500 bg-clip-text text-transparent"> {/* Adjusted text size */}
                Về chúng tôi
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed"> {/* Adjusted text size and color */}
                Mạng lưới CLB sinh viên nghiên cứu là cầu nối giữa các câu lạc
                bộ, tạo môi trường học thuật sôi động và thúc đẩy tinh thần đổi
                mới sáng tạo trong cộng đồng sinh viên Bách khoa Hà Nội.
              </p>
            </div>

            {/* Quick Links using Card component */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6"> {/* Adjusted gap */}
              <Link href="/about/overview" className="block group">
                <Card className="h-full"> {/* Use Card, ensure full height */}
                  <CardHeader className="pb-2"> {/* Adjust padding */}
                    <CardTitle className="text-lg sm:text-xl text-secondary"> {/* Adjusted size and color */}
                      Tổng quan
                    </CardTitle>
                    <CardAction>
                      <ArrowUpRight className="h-5 w-5 text-secondary transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground"> {/* Adjusted size */}
                      Tìm hiểu về lịch sử, sứ mệnh và tầm nhìn của mạng lưới
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/about/structure" className="block group">
                <Card className="h-full"> {/* Use Card, ensure full height */}
                  <CardHeader className="pb-2"> {/* Adjust padding */}
                    <CardTitle className="text-lg sm:text-xl text-secondary"> {/* Adjusted size and color */}
                      Cơ cấu tổ chức
                    </CardTitle>
                    <CardAction>
                      <ArrowUpRight className="h-5 w-5 text-secondary transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground"> {/* Adjusted size */}
                      Khám phá cấu trúc và các đơn vị thành viên của mạng lưới
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden"> {/* Adjusted rounding and aspect ratio */}
            <Image
              src="https://hust.edu.vn/uploads/sys/news/2023_03/20230324-dsc05535.jpg"
              alt="Student Research"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw" // Added sizes prop
              className="object-cover transition-transform duration-500 hover:scale-105" // Kept hover effect
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-500/10 to-cardinal-500/10 pointer-events-none" /> {/* Added pointer-events-none */}
          </div>
        </div>
      </div>
    </section>
  );
}
