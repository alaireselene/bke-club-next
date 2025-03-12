"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { School, Club } from "./types";

type Props = {
  schools: School[];
  clubsBySchool: Record<number, Club[]>;
  scrolled?: boolean;
};

export function DesktopMenu({
  schools,
  clubsBySchool,
  scrolled = false,
}: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed z-40 w-full border-b border-cardinal-200/50 shadow-sm transition-all duration-300 ${
        scrolled
          ? "top-20 bg-cardinal-800/95 backdrop-blur-md"
          : "top-24 bg-gradient-to-r from-cardinal-800 via-cardinal-700 to-cardinal-600"
      }`}
    >
      {/* Scientific menu decoration - subtle pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden h-16 items-center justify-between md:flex">
          <div className="flex flex-1 items-center justify-between space-x-8">
            {/* About Dropdown */}
            <div className="group relative">
              <button
                className={`group inline-flex items-center font-medium text-chalk-100 hover:text-chalk-200 uppercase transition-all duration-200 focus:outline-none ${
                  pathname?.startsWith("/about")
                    ? "text-chalk-200 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-chalk-200 after:content-['']"
                    : ""
                }`}
                aria-haspopup="true"
              >
                <span>Giới thiệu</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 z-50 mt-2 w-48 transform translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-lg bg-white/95 backdrop-blur-lg py-2 shadow-xl ring-1 ring-cardinal-200/70">
                  <Link
                    href="/about"
                    className="group/link relative block px-4 py-2.5 text-sm text-cardinal-700 hover:text-cardinal-600 transition-colors duration-200"
                  >
                    Tổng quan
                  </Link>
                  <Link
                    href="/about/structure"
                    className="hover:text-cardinal-600 block px-4 py-2 text-sm text-cardinal-700 hover:bg-cardinal-50"
                  >
                    Cơ cấu tổ chức
                  </Link>
                </div>
              </div>
            </div>

            {/* News and Events Links */}
            {[
              { href: "/news", text: "Tin tức" },
              { href: "/events", text: "Sự kiện nổi bật" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-chalk-200 focus:ring-chalk-200 text-chalk-100 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname === href ? "text-chalk-200 font-bold" : "font-medium"
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {text}
              </Link>
            ))}

            {/* Network Dropdown */}
            <div className="group relative">
              <button
                className={`hover:text-chalk-200 focus:ring-chalk-200 flex items-center font-medium text-chalk-100 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname?.startsWith("/network")
                    ? "text-chalk-200 font-bold"
                    : ""
                }`}
                aria-haspopup="true"
              >
                <span>Mạng lưới</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 z-50 mt-2 w-64 transform opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="ring-opacity-5 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black">
                  {schools.map((school) => (
                    <div
                      key={school.id}
                      className="group/school relative px-4 py-2 hover:bg-cardinal-50"
                    >
                      <Link
                        href={`/network?school=${school.slug.toUpperCase()}`}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-cardinal-700">
                          {school.name}
                        </span>
                        <span className="ml-2 rounded bg-cardinal-100 px-2 py-0.5 text-xs font-medium text-cardinal-600">
                          {school.slug.toUpperCase()}
                        </span>
                      </Link>
                      {/* Clubs Submenu */}
                      <div className="invisible absolute top-0 left-full ml-2 w-64 transform opacity-0 transition-all duration-200 group-hover/school:visible group-hover/school:opacity-100">
                        <div className="ring-opacity-5 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black">
                          {(clubsBySchool[school.id] || []).map((club) => (
                            <Link
                              key={club.id}
                              href={`/network/${club.slug}`}
                              className="hover:text-cardinal-600 block px-4 py-2 text-sm text-cardinal-700 hover:bg-cardinal-50"
                            >
                              {club.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Navigation Links */}
            {[
              { href: "/research", text: "Đề tài SVNCKH" },
              { href: "/partnerships", text: "Hợp tác Đối ngoại" },
              { href: "/resources", text: "Tài nguyên" },
              { href: "/facilities", text: "Cơ sở vật chất" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-chalk-200 focus:ring-chalk-200 font-medium text-chalk-100 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname === href ? "text-chalk-200 font-bold" : ""
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {text}
              </Link>
            ))}

            <a
              href="https://student.hust.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chalk-200 hover:text-chalk-300 focus:ring-chalk-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="Open eHUST in new tab"
            >
              eHUST
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
