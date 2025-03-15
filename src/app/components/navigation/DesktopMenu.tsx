"use client";

import Link from "next/link";
import type { School } from "@/types/wordpress";
import { usePathname } from "next/navigation";

interface Props {
  schools: School[];
  scrolled: boolean;
}

export function DesktopMenu({ schools, scrolled }: Props) {
  const pathname = usePathname();

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
          <Link
            href="/events"
            className={`flex items-center transition-colors hover:underline ${
              pathname === "/events" ? "text-cardinal-600" : "text-chalk-100"
            }`}
          >
            Sự kiện
          </Link>
          <Link
            href="/news"
            className={`flex items-center transition-colors hover:underline ${
              pathname === "/news" ? "text-cardinal-600" : "text-chalk-100"
            }`}
          >
            Tin tức
          </Link>

          {/* Center Navigation - Network */}
          <div className="group/network relative">
            <Link
              href="/network"
              className={`flex items-center transition-colors hover:underline ${
                pathname.startsWith("/network")
                  ? "text-cardinal-600"
                  : "text-chalk-100"
              }`}
            >
              Mạng lưới
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 invisible opacity-0 transition-all duration-200 group-hover/network:visible group-hover/network:opacity-100">
              <div className="py-1">
                {/* School section */}
                <div className="px-3 py-1.5 text-xs font-medium text-slate-500">
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
                <div className="mt-2 border-t border-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
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
                <div className="mt-2 border-t border-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
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
            className={`flex items-center transition-colors hover:underline ${
              pathname === "/research" ? "text-cardinal-600" : "text-chalk-100"
            }`}
          >
            Sinh viên NCKH
          </Link>
          <Link
            href="/resources"
            className={`flex items-center transition-colors hover:underline ${
              pathname === "/resources" ? "text-cardinal-600" : "text-chalk-100"
            }`}
          >
            Tài nguyên
          </Link>
          <Link
            href="/facilities"
            className={`flex items-center transition-colors hover:underline ${
              pathname === "/facilities"
                ? "text-cardinal-600"
                : "text-chalk-100"
            }`}
          >
            Cơ sở vật chất
          </Link>
        </nav>
      </div>
    </div>
  );
}
