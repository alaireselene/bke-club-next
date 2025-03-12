"use client";

import Link from "next/link";
import { Calendar, Users, Lightbulb, Flag } from "lucide-react";

type StatLabel = "Câu lạc bộ" | "Thành viên" | "Dự án" | "Sự kiện";

interface Stat {
  value: string;
  label: StatLabel;
}

interface HeroProps {
  stats: Stat[];
}

const icons = {
  "Câu lạc bộ": Calendar,
  "Thành viên": Users,
  "Dự án": Lightbulb,
  "Sự kiện": Flag,
} as const;

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative -mt-8 overflow-hidden bg-gradient-radial from-cardinal-50 via-white to-sunflower-50/30 px-4 pt-20 pb-28 sm:px-6 lg:px-8">
      {/* Scientific Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Molecular structure patterns */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cardinal-400/5 blur-[100px]"></div>
        <div className="absolute bottom-24 right-0 -z-10 h-[250px] w-[250px] rounded-full bg-sunflower-400/10 blur-[100px]"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full border border-dashed border-cardinal-200/40 opacity-60"></div>
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full border border-dashed border-sunflower-200/40 opacity-60"></div>

        {/* Scientific formulas - subtle background text */}
        <div className="absolute bottom-10 left-10 font-serif text-[10px] text-cardinal-300/20 rotate-12 select-none">
          E = mc<sup>2</sup>
        </div>
        <div className="absolute top-20 right-20 font-serif text-[10px] text-navy-300/20 -rotate-6 select-none">
          F = ma
        </div>

        {/* DNA helix pattern - subtle decorative element */}
        <div className="absolute -left-20 top-1/3 h-[200px] w-[100px] opacity-10">
          <div className="absolute h-full w-[2px] left-1/2 bg-gradient-to-b from-cardinal-300/0 via-cardinal-400/50 to-cardinal-300/0"></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={`dna-left-${i}`}
              className="absolute w-[10px] h-[2px] bg-cardinal-400/50"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `translateX(-100%) rotate(${i % 2 ? 30 : -30}deg)`,
              }}
            ></div>
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`dna-right-${i}`}
              className="absolute w-[10px] h-[2px] bg-cardinal-400/50"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `rotate(${i % 2 ? -30 : 30}deg)`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 text-center">
          <h1 className="relative font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="animate-fade-in">Kết nối,</span>{" "}
            <span className="animate-fade-in [animation-delay:200ms]">
              Thúc đẩy,
            </span>{" "}
            <span className="animate-fade-in [animation-delay:400ms] bg-gradient-to-r from-cardinal-600 to-cardinal-500 bg-clip-text text-transparent">
              Đổi mới.
            </span>
            <div className="absolute -right-16 top-0 h-32 w-32 animate-fade-in [animation-delay:600ms]">
              <div className="absolute h-full w-full animate-slow-spin">
                <div className="absolute -left-1 top-1/2 h-1.5 w-1.5 rounded-full bg-cardinal-400"></div>
                <div className="absolute left-1/2 -top-1 h-1.5 w-1.5 rounded-full bg-cardinal-400"></div>
                <div className="absolute -right-1 top-1/2 h-1.5 w-1.5 rounded-full bg-cardinal-400"></div>
                <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 rounded-full bg-cardinal-400"></div>
                <div className="absolute h-full w-full border border-dashed border-cardinal-200 rounded-full opacity-60"></div>
              </div>
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-in text-lg leading-relaxed text-slate-600 [animation-delay:600ms]">
            Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và
            đổi mới tại Đại học Bách khoa Hà Nội
          </p>

          {/* Stats Grid */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:gap-x-12 md:grid-cols-4">
            {stats.map(({ label, value }, index) => {
              const Icon = icons[label];
              return (
                <div
                  key={label}
                  className="group relative text-center animate-fade-in"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden">
                    {/* Scientific background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cardinal-50 to-white"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.05)_0%,transparent_50%)]"></div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cardinal-200 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cardinal-200 to-transparent"></div>
                    </div>
                    <Icon className="relative z-10 h-8 w-8 text-cardinal-600 transition-all duration-300 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-4 font-sans text-3xl font-bold text-slate-900">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <Link
              href="/network"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cardinal-600 to-cardinal-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cardinal-600 to-cardinal-500"></span>
              <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
              <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>

              {/* Scientific decorative elements */}
              <span className="absolute top-0 left-0 h-1 w-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute bottom-0 right-0 h-1 w-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"></span>

              <span className="relative">Khám phá mạng lưới</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
