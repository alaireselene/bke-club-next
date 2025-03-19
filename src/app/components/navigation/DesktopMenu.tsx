"use client";

import Link from "next/link";
import type { School } from "@/types/wordpress";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  schools: School[];
  scrolled: boolean;
}

export function DesktopMenu({ schools, scrolled }: Props) {
  const pathname = usePathname();
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [networkExpanded, setNetworkExpanded] = useState(false);

  return (
    <div
      className={`fixed left-0 right-0 z-40 hidden md:block transition-all duration-300 ${
        scrolled ? "top-20" : "top-24"
      } ${
        scrolled
          ? "bg-cardinal-800/95 backdrop-blur-md"
          : "bg-gradient-to-r from-cardinal-800 via-cardinal-700 to-cardinal-600"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <nav className="flex h-12 items-center justify-evenly">
          {/* Left Navigation */}
          <div
            className="group/about relative"
            onMouseEnter={() => setAboutExpanded(true)}
            onMouseLeave={() => setAboutExpanded(false)}
          >
            <Link
              href="/about"
              className={`flex items-center gap-1 transition-colors hover:underline text-white ${
                pathname.startsWith("/about") && "bg-cardinal-700"
              } uppercase font-bold relative`}
            >
              Giới thiệu
              {aboutExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Link>

            {/* About Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 invisible opacity-0 transition-all duration-200 group-hover/about:visible group-hover/about:opacity-100">
              <div className="py-1">
                <Link
                  href="/about/overview"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                >
                  Tổng quan
                </Link>
                <Link
                  href="/about/structure"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                >
                  Cơ cấu tổ chức
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/news"
            className={`flex items-center transition-colors hover:underline text-white $ uppercase font-bold relative`}
          >
            Tin tức
          </Link>
          <Link
            href="/events"
            className={`flex items-center transition-colors hover:underline text-white  uppercase font-bold relative`}
          >
            Sự kiện nổi bật
          </Link>

          {/* Center Navigation - Network */}
          <div
            className="group/network relative"
            onMouseEnter={() => setNetworkExpanded(true)}
            onMouseLeave={() => setNetworkExpanded(false)}
          >
            <Link
              href="/network"
              className={`flex items-center gap-1 transition-colors hover:underline text-white uppercase font-bold relative`}
            >
              Mạng lưới
              {networkExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 invisible opacity-0 transition-all duration-200 group-hover/network:visible group-hover/network:opacity-100">
              <div className="py-1">
                {/* School section */}
                <div className="px-3 py-1.5 text-sm font-semibold text-cardinal-500">
                  Trường
                </div>
                {schools
                  .filter((school) => school.name?.startsWith("Trường"))
                  .map((school) => (
                    <div key={school.id} className="group/school relative">
                      <Link
                        href={`/network?school=${school.slug?.toUpperCase()}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                      >
                        <span>{school.name}</span>
                        {school.slug && (
                          <span className="rounded bg-cardinal-100 px-2 py-0.5 text-xs font-medium text-cardinal-600">
                            {school.slug.toUpperCase()}
                          </span>
                        )}
                      </Link>
                      {/* Nested Dropdown */}
                      <div className="absolute left-full top-0 invisible w-72 rounded-md bg-white shadow-lg opacity-0 transition-all duration-200 group-hover/school:visible group-hover/school:opacity-100">
                        <div className="py-1">
                          {(school.clubs?.nodes || []).map((club) => (
                            <Link
                              key={club.id}
                              href={`/network/${club.slug}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                            >
                              {club.title}
                            </Link>
                          ))}
                          {(!school.clubs?.nodes ||
                            school.clubs.nodes.length === 0) && (
                            <div className="px-4 py-2 text-sm text-slate-500 italic">
                              Chưa có CLB
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Faculty section */}
                <div className="mt-2 border-t border-slate-100 px-3 py-1.5 text-sm font-semibold text-cardinal-500">
                  Khoa
                </div>
                {schools
                  .filter((school) => school.name?.startsWith("Khoa"))
                  .map((school) => (
                    <div key={school.id} className="group/school relative">
                      <Link
                        href={`/network?school=${school.slug?.toUpperCase()}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                      >
                        <span>{school.name}</span>
                        {school.slug && (
                          <span className="rounded bg-cardinal-100 px-2 py-0.5 text-xs font-medium text-cardinal-600">
                            {school.slug.toUpperCase()}
                          </span>
                        )}
                      </Link>
                      {/* Nested Dropdown */}
                      <div className="absolute left-full top-0 invisible w-72 rounded-md bg-white shadow-lg opacity-0 transition-all duration-200 group-hover/school:visible group-hover/school:opacity-100">
                        <div className="py-1">
                          {(school.clubs?.nodes || []).map((club) => (
                            <Link
                              key={club.id}
                              href={`/network/${club.slug}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                            >
                              {club.title}
                            </Link>
                          ))}
                          {(!school.clubs?.nodes ||
                            school.clubs.nodes.length === 0) && (
                            <div className="px-4 py-2 text-sm text-slate-500 italic">
                              Chưa có CLB
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Others section */}
                <div className="mt-2 border-t border-slate-100 px-3 py-1.5 text-sm font-semibold text-cardinal-500">
                  Khác
                </div>
                {schools
                  .filter(
                    (school) =>
                      !school.name?.startsWith("Trường") &&
                      !school.name?.startsWith("Khoa")
                  )
                  .map((school) => (
                    <div key={school.id} className="group/school relative">
                      <Link
                        href={`/network?school=${school.slug?.toUpperCase()}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                      >
                        <span>{school.name}</span>
                        {school.slug && (
                          <span className="rounded bg-cardinal-100 px-2 py-0.5 text-xs font-medium text-cardinal-600">
                            {school.slug.toUpperCase()}
                          </span>
                        )}
                      </Link>
                      {/* Nested Dropdown */}
                      <div className="absolute left-full top-0 invisible w-72 rounded-md bg-white shadow-lg opacity-0 transition-all duration-200 group-hover/school:visible group-hover/school:opacity-100">
                        <div className="py-1">
                          {(school.clubs?.nodes || []).map((club) => (
                            <Link
                              key={club.id}
                              href={`/network/${club.slug}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cardinal-50 hover:text-cardinal-600"
                            >
                              {club.title}
                            </Link>
                          ))}
                          {(!school.clubs?.nodes ||
                            school.clubs.nodes.length === 0) && (
                            <div className="px-4 py-2 text-sm text-slate-500 italic">
                              Chưa có CLB
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <Link
            href="/research"
            className={`flex items-center transition-colors hover:underline text-white  uppercase font-bold relative`}
          >
            Đề tài SVNCKH
          </Link>
          <Link
            href="/partners"
            className={`flex items-center transition-colors hover:underline text-white  uppercase font-bold relative`}
          >
            Hợp tác đối ngoại
          </Link>
          <Link
            href="/resources"
            className={`flex items-center transition-colors hover:underline text-white  uppercase font-bold relative`}
          >
            Tài nguyên
          </Link>
          <Link
            href="/facility"
            className={`flex items-center transition-colors hover:underline text-white  uppercase font-bold relative`}
          >
            Cơ sở vật chất
          </Link>
          <Link
            href="https://student.hust.edu.vn"
            className={`flex items-center transition-colors hover:underline text-chalk-100 font-bold`}
            target="_blank"
            rel="noopener noreferrer"
          >
            eHUST
          </Link>
        </nav>
      </div>
    </div>
  );
}
