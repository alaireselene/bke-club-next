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
    <section className="relative -mt-8 overflow-hidden bg-gradient-to-b from-base-100 to-base-200 px-4 pt-20 pb-28 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 30L30 0M0 0L30 30"
                stroke="currentColor"
                className="text-base-300"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-neutral-content sm:text-5xl md:text-6xl">
            Kết nối, Thúc đẩy, Đổi mới.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/70">
            Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và
            đổi mới tại Đại học Bách khoa Hà Nội
          </p>

          {/* Stats Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 sm:gap-x-12 md:grid-cols-4">
            {stats.map(({ label, value }) => {
              const Icon = icons[label];
              return (
                <div key={label} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mt-4 font-sans text-2xl font-bold text-neutral-content">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-base-content/70">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <Link href="/network" className="btn btn-primary btn-lg">
              Khám phá mạng lưới
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
