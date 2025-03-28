"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function QuickAbout() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50/50 to-white"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,51,102,0.05)_0%,transparent_70%)]"></div>

        {/* DNA Double Helix Animation */}
        <div className="absolute right-0 top-1/4 h-[300px] w-[100px] opacity-10">
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
            <div className="space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-navy-700 to-navy-500 bg-clip-text text-transparent">
                Về chúng tôi
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Mạng lưới CLB sinh viên nghiên cứu là cầu nối giữa các câu lạc
                bộ, tạo môi trường học thuật sôi động và thúc đẩy tinh thần đổi
                mới sáng tạo trong cộng đồng sinh viên Bách khoa Hà Nội.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/about/overview"
                className="group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-navy-700">
                      Tổng quan
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-navy-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-slate-600">
                    Tìm hiểu về lịch sử, sứ mệnh và tầm nhìn của mạng lưới
                  </p>
                </div>
              </Link>

              <Link
                href="/about/structure"
                className="group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-navy-700">
                      Cơ cấu tổ chức
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-navy-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-slate-600">
                    Khám phá cấu trúc và các đơn vị thành viên của mạng lưới
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="https://hust.edu.vn/uploads/sys/news/2023_03/20230324-dsc05535.jpg"
              alt="Student Research"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-500/10 to-cardinal-500/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
