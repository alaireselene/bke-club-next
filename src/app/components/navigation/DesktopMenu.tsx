"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { School, Club } from "./types";

type Props = {
  schools: School[];
  clubsBySchool: Record<number, Club[]>;
};

export function DesktopMenu({ schools, clubsBySchool }: Props) {
  const pathname = usePathname();

  return (
    <nav className="border-cardinal-100 bg-chalk-50 fixed top-20 z-40 w-full border-y shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden h-14 items-center justify-between md:flex">
          <div className="flex flex-1 items-center justify-between space-x-8">
            {/* About Dropdown */}
            <div className="group relative">
              <button
                className={`hover:text-cardinal-600 focus:ring-cardinal-600 flex items-center font-medium text-slate-700 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname?.startsWith("/about")
                    ? "text-cardinal-600 font-bold"
                    : ""
                }`}
                aria-haspopup="true"
              >
                <span>Giới thiệu</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 z-50 mt-2 w-48 transform opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="ring-opacity-5 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black">
                  <Link
                    href="/about"
                    className="hover:text-cardinal-600 block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Tổng quan
                  </Link>
                  <Link
                    href="/about/structure"
                    className="hover:text-cardinal-600 block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
                className={`hover:text-cardinal-600 focus:ring-cardinal-600 text-slate-700 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname === href
                    ? "text-cardinal-600 font-bold"
                    : "font-medium"
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {text}
              </Link>
            ))}

            {/* Network Dropdown */}
            <div className="group relative">
              <button
                className={`hover:text-cardinal-600 focus:ring-cardinal-600 flex items-center font-medium text-slate-700 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname?.startsWith("/network")
                    ? "text-cardinal-600 font-bold"
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
                      className="group/school relative px-4 py-2 hover:bg-slate-50"
                    >
                      <Link
                        href={`/network?school=${school.slug.toUpperCase()}`}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-700">
                          {school.name}
                        </span>
                        <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
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
                              className="hover:text-cardinal-600 block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
                className={`hover:text-cardinal-600 focus:ring-cardinal-600 font-medium text-slate-700 uppercase transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  pathname === href ? "text-cardinal-600 font-bold" : ""
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
              className="text-cardinal-600 hover:text-cardinal-700 focus:ring-cardinal-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
