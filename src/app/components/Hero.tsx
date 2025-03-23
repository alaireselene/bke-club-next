"use client";

import Link from "next/link";
import { Calendar, Users, Flag, Handshake } from "lucide-react";
import { motion } from "motion/react";

type StatLabel = "Câu lạc bộ" | "Thành viên" | "Đối tác" | "Sự kiện";

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
  "Đối tác": Handshake,
  "Sự kiện": Flag,
} as const;

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative -mt-8 overflow-hidden bg-gradient-radial from-[#CE1628]/5 via-white to-[#F3C108]/10 px-4 pt-24 pb-24 sm:px-6 lg:px-8">
      {/* Scientific Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Molecular structure patterns */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cardinal-400/5 blur-[100px]" />
        <div className="absolute bottom-24 right-0 -z-10 h-[250px] w-[250px] rounded-full bg-sunflower-400/10 blur-[100px]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full border-2 border-dashed border-cardinal-200/40" />
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full border-2 border-dashed border-sunflower-200/40" />

        {/* Scientific formulas - enhanced typography */}
        <div className="absolute bottom-10 left-10 font-mono text-[12px] font-bold text-cardinal-300/20 rotate-12 select-none">
          E = mc<sup>2</sup>
        </div>
        <div className="absolute top-20 right-20 font-mono text-[12px] font-bold text-navy-300/20 -rotate-6 select-none">
          F = ma
        </div>

        {/* DNA helix pattern - enhanced animation */}
        <div className="absolute -left-20 top-1/3 h-[200px] w-[100px]">
          <div className="absolute w-[2px] left-1/2 bg-gradient-to-b from-cardinal-300/0 via-cardinal-400/50 to-cardinal-300/0" />
          {[...Array(10)].map((_, i) => (
            <div
              key={`dna-left-${i}`}
              className="absolute w-[10px] h-[2px] bg-cardinal-400/50"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `translateX(-100%) rotate(${i % 2 ? 30 : -30}deg)`,
              }}
            />
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
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 text-center">
          <h1 className="relative font-sans text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
            <span>Kết nối, Hỗ trợ,</span>
            <br />
            <span className="bg-gradient-to-r from-cardinal-600 to-cardinal-500 bg-clip-text text-transparent">
              Thúc đẩy Phát triển
            </span>
            <div className="absolute -right-16 top-0 h-32 w-32">
              <div className="absolute h-full w-full animate-slow-spin">
                <div className="absolute -left-1 top-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute left-1/2 -top-1 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute bottom-0 left-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute h-full w-full border-2 border-dashed border-cardinal-200 rounded-full opacity-60"></div>
              </div>
            </div>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-600">
            Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và
            đổi mới tại Đại học Bách khoa Hà Nội
          </p>

          {/* Stats Grid */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 sm:gap-x-16 md:grid-cols-4">
            {stats.map(({ label, value }, index) => {
              const Icon = icons[label];
              return (
                <div key={label} className="group relative text-center">
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl overflow-hidden">
                    {/* Scientific background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cardinal-50 to-white"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.05)_0%,transparent_50%)]"></div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cardinal-200 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cardinal-200 to-transparent"></div>
                    </div>
                    <Icon className="relative z-10 h-10 w-10 text-cardinal-600 transition-all duration-300 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-6 font-sans text-4xl font-bold text-slate-900">
                    {value}
                  </p>
                  <p className="mt-2 text-base font-medium text-slate-600">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-20">
            <div>
              <Link
                href="/network"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cardinal-600 to-cardinal-500 px-10 py-5 font-bold text-white transition-all duration-300 hover:shadow-xl"
              >
                {/* Button glow effect */}
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cardinal-600 to-cardinal-500"></span>
                <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
                <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>

                {/* Scientific decorative elements */}
                <span className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"></span>

                <span className="relative text-lg">Khám phá mạng lưới</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
