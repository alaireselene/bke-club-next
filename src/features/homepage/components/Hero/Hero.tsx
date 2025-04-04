"use client";

import Link from "next/link";
import { Calendar, Users, Flag, Handshake } from "lucide-react";
// Removed: import { motion } from "motion/react";
import type { HeroProps } from "./types";

const icons = {
  "Câu lạc bộ": Calendar,
  "Thành viên": Users,
  "Đối tác": Handshake,
  "Sự kiện": Flag,
} as const;

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative -mt-8 overflow-hidden bg-gradient-radial from-cardinal-600/5 via-white to-sunflower-500/10 section-spacing container-padding">
      {/* Scientific Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Enhanced grid pattern */}
        <div
          className="absolute inset-0 animate-fade-in bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]"
          style={{ animationDuration: '1s' }}
        />

        {/* Molecular structure patterns */}
        <div
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cardinal-400/5 blur-[100px] animate-fade-in scale-90 opacity-0"
          style={{ animationDuration: '1.2s', animationFillMode: 'forwards', transformOrigin: 'center' }} // Use style for complex animation props
        />
        <div
          className="absolute bottom-24 right-0 -z-10 h-[250px] w-[250px] rounded-full bg-sunflower-400/10 blur-[100px] animate-fade-in scale-90 opacity-0"
          style={{ animationDuration: '1.2s', animationDelay: '0.2s', animationFillMode: 'forwards', transformOrigin: 'center' }}
        />

        {/* Decorative elements */}
        <div
          className="absolute top-20 left-10 h-40 w-40 rounded-full border-2 border-dashed border-cardinal-200/40 opacity-0 animate-fade-in rotate-[-90deg]"
          style={{ animationDuration: '1s', animationDelay: '0.3s', animationFillMode: 'forwards', transformOrigin: 'center' }} // Added opacity-0 and transform for initial state
        />
        <div
          className="absolute bottom-20 right-10 h-60 w-60 rounded-full border-2 border-dashed border-sunflower-200/40 opacity-0 animate-fade-in rotate-90"
          style={{ animationDuration: '1s', animationDelay: '0.4s', animationFillMode: 'forwards', transformOrigin: 'center' }} // Added opacity-0 and transform for initial state
        />

        {/* Scientific formulas - enhanced typography */}
        <div
          className="absolute bottom-10 left-10 font-mono text-[12px] font-bold text-cardinal-300/20 rotate-12 select-none animate-fade-in opacity-0"
          style={{ animationDuration: '0.6s', animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          E = mc<sup>2</sup>
        </div>
        <div
          className="absolute top-20 right-20 font-mono text-[12px] font-bold text-navy-300/20 -rotate-6 select-none animate-fade-in opacity-0"
          style={{ animationDuration: '0.6s', animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          F = ma
        </div>

        {/* DNA helix pattern - simplified animation */}
        <div
          className="absolute -left-20 top-1/3 h-[200px] w-[100px] opacity-0 animate-fade-in" // Fade in container
          style={{ animationDuration: '1s', animationFillMode: 'forwards' }}
        >
          <div
            className="absolute w-[2px] left-1/2 h-0 bg-gradient-to-b from-cardinal-300/0 via-cardinal-400/50 to-cardinal-300/0 animate-fade-in" // Animate height might need custom keyframes if fade-in isn't enough
            style={{ animationDuration: '1s', animationDelay: '0.2s', animationFillMode: 'forwards', height: '100%' }} // Set final height via style
          />
          {[...Array(10)].map((_, i) => (
            <div
              key={`dna-left-${i}`}
              className="absolute w-[10px] h-[2px] bg-cardinal-400/50 opacity-0 scale-0 animate-fade-in"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `translateX(-100%) rotate(${i % 2 ? 30 : -30}deg)`,
                animationDuration: '0.5s',
                animationDelay: `${0.6 + i * 0.1}s`, // Stagger delay
                animationFillMode: 'forwards',
                transformOrigin: 'center',
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`dna-right-${i}`}
              className="absolute w-[10px] h-[2px] bg-cardinal-400/50 opacity-0 scale-0 animate-fade-in"
              style={{
                top: `${i * 20}px`,
                left: "50%",
                transform: `rotate(${i % 2 ? -30 : 30}deg)`,
                animationDuration: '0.5s',
                animationDelay: `${0.6 + i * 0.1}s`, // Stagger delay
                animationFillMode: 'forwards',
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 text-center">
          <h1>
            <span
              className="block animate-fade-in opacity-0 text-brand-secondary"
              style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}
            >
              Kết nối, Hỗ trợ,
            </span>
            <br />
            <span
              className="block animate-fade-in bg-gradient-to-r from-cardinal-600 to-cardinal-500 bg-clip-text text-transparent opacity-0"
              style={{ animationDuration: '0.6s', animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Thúc đẩy Phát triển
            </span>
            <div className="absolute -right-16 top-0 h-32 w-32">
              <div
                className="absolute h-full w-full animate-slow-spin opacity-0 scale-90" // Use slow-spin, add fade-in like effect
                style={{ animationDuration: '12s, 0.8s', animationDelay: '0s, 0.4s', animationFillMode: 'forwards', transformOrigin: 'center' }} // Combine animations
              >
                <div className="absolute -left-1 top-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute left-1/2 -top-1 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute bottom-0 left-1/2 h-2 w-2 rounded-full bg-cardinal-400"></div>
                <div className="absolute h-full w-full border-2 border-dashed border-cardinal-200 rounded-full opacity-60"></div>
              </div>
            </div>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl content-spacing animate-fade-in opacity-0"
            style={{ animationDuration: '0.6s', animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và
            đổi mới tại Đại học Bách khoa Hà Nội
          </p>

          {/* Stats Grid */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:mt-20 sm:gap-8 md:grid-cols-4 md:gap-x-16"> {/* Adjusted top margin and gap for mobile */}
            {stats.map(({ label, value }, index) => {
              const Icon = icons[label];
              return (
                <div
                  key={label}
                  className="group relative text-center animate-fade-in opacity-0"
                  style={{ animationDuration: '0.6s', animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div
                    className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 overflow-hidden" // Added group-hover:scale-110
                  >
                    {/* Scientific background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cardinal-50 to-white"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.05)_0%,transparent_50%)]"></div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cardinal-200 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cardinal-200 to-transparent"></div>
                    </div>
                    <Icon className="relative z-10 h-10 w-10 text-cardinal-600 transition-all duration-300 group-hover:-translate-y-1" />
                  </div>
                  <p
                    className="mt-6 text-3xl md:text-4xl font-bold text-brand-primary animate-fade-in opacity-0"
                    style={{ animationDuration: '0.3s', animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-2 text-base md:text-lg font-medium text-brand-secondary animate-fade-in opacity-0"
                    style={{ animationDuration: '0.3s', animationDelay: `${0.9 + index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-16 sm:mt-20 animate-fade-in opacity-0" // Adjusted top margin for mobile
            style={{ animationDuration: '0.6s', animationDelay: '1.2s', animationFillMode: 'forwards' }}
          >
            <div className="transition-transform duration-300 hover:scale-105"> {/* Added hover scale effect */}
              <Link
                href="/network"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand-primary px-8 py-3 font-bold text-white transition-all duration-300 hover:shadow-xl"
              >
                {/* Button glow effect */}
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cardinal-600 to-cardinal-500"></span>
                <span className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></span>
                <span className="absolute -end-full -start-full top-1/2 h-48 -translate-y-1/2 translate-x-0 bg-white/10 transition-all duration-500 ease-out group-hover:translate-x-full"></span>

                {/* Scientific decorative elements */}
                <span className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"></span>
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"></span>

                <span className="relative text-lg">Khám phá mạng lưới</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
