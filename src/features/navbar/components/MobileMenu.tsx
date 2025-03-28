"use client";

import Link from "next/link";
import { X, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import type { School } from "@/features/network";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  currentLang?: string;
  onToggleLanguage?: () => void;
  isAdmin?: boolean;
}

export function MobileMenu({
  isOpen,
  onClose,
  schools,
  currentLang = "VI",
  onToggleLanguage,
  isAdmin = false,
}: Props) {
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSchools, setExpandedSchools] = useState<Set<string>>(
    new Set()
  );

  const toggleSchool = (schoolId: string) => {
    setExpandedSchools((prev) => {
      const next = new Set(prev);
      if (next.has(schoolId)) {
        next.delete(schoolId);
      } else {
        next.add(schoolId);
      }
      return next;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div
      id="mobile-menu"
      className={`mobile-menu fixed inset-0 z-50 transform md:hidden ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-all duration-300 ease-out`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-cardinal-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <div
        className={`absolute right-0 h-full w-[90%] max-w-md transform overflow-y-auto bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 ease-out dark:bg-card/95 ${
          isOpen ? "translate-x-0" : "translate-x-full scale-95"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-cardinal-100 px-6 backdrop-blur-lg">
          <div className="flex items-center space-x-4">
            <div className="font-sans text-xl font-semibold text-cardinal-600">
              Menu
            </div>
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                className="rounded-full bg-cardinal-50/50 px-3 py-1.5 text-sm font-medium text-cardinal-600 transition-all duration-200 hover:bg-cardinal-100/50"
              >
                {currentLang}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-cardinal-600 transition-all duration-200 hover:bg-cardinal-50/50 hover:text-cardinal-700 focus:outline-none focus:ring-2 focus:ring-cardinal-500 focus:ring-offset-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-2 py-3">
          <div className="space-y-1">
            {/* Main Links */}
            {[
              { href: "/about", text: "Giới thiệu" },
              { href: "/news", text: "Tin tức" },
              { href: "/events", text: "Sự kiện nổi bật" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`block rounded-full px-4 py-2.5 text-base font-medium transition-all duration-200 ${
                  pathname === href
                    ? "bg-cardinal-50/50 text-cardinal-600"
                    : "text-slate-600 hover:bg-slate-50/50 hover:text-cardinal-600"
                }`}
                onClick={onClose}
              >
                {text}
              </Link>
            ))}

            {/* Network Section */}
            <div className="relative space-y-2 py-4">
              <div className="px-4 py-2 text-sm font-sans font-semibold uppercase tracking-wider text-cardinal-600/70">
                Mạng lưới
              </div>

              {/* Schools Section */}
              <div>
                <button
                  onClick={() => toggleCategory("schools")}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600 rounded-full"
                >
                  <span>Trường</span>
                  <div className="ml-2">
                    {expandedCategory === "schools" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                {expandedCategory === "schools" && (
                  <div className="space-y-1">
                    {schools
                      .filter((school) => school.name?.startsWith("Trường"))
                      .map((school) => (
                        <div key={school.databaseId} className="rounded-lg">
                          <button
                            onClick={() =>
                              toggleSchool(school.databaseId.toString())
                            }
                            className="flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600"
                          >
                            <span className="flex-1 text-left truncate">
                              {school.name}
                            </span>
                            <div className="flex-shrink-0">
                              {expandedSchools.has(
                                school.databaseId.toString()
                              ) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(
                            school.databaseId.toString()
                          ) && (
                            <div className="ml-8 mt-2 space-y-0.5 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.databaseId}
                                  href={`/network/${club.slug}`}
                                  className="flex items-center justify-between rounded-full px-4 py-2 text-sm transition-all duration-200 hover:bg-cardinal-50/30"
                                  onClick={onClose}
                                >
                                  <span className="flex-1 text-slate-600 font-medium transition-colors hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                  {club.clubData?.membersCount && (
                                    <span className="ml-2 rounded-full bg-slate-100/80 px-2 py-0.5 text-xs text-slate-500 transition-colors group-hover:bg-cardinal-100/50 group-hover:text-cardinal-600">
                                      {club.clubData.membersCount} thành viên
                                    </span>
                                  )}
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="mx-4 flex items-center justify-center rounded-full bg-slate-50/50 px-4 py-3 text-sm text-slate-500 italic backdrop-blur-sm">
                                  Chưa có CLB
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Faculty Section */}
              <div>
                <button
                  onClick={() => toggleCategory("faculties")}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600 rounded-full"
                >
                  <span>Khoa</span>
                  {expandedCategory === "faculties" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedCategory === "faculties" && (
                  <div className="space-y-1">
                    {schools
                      .filter((school) => school.name?.startsWith("Khoa"))
                      .map((school) => (
                        <div key={school.databaseId} className="rounded-lg">
                          <button
                            onClick={() =>
                              toggleSchool(school.databaseId.toString())
                            }
                            className="flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600"
                          >
                            <span className="flex-1 text-left truncate">
                              {school.name}
                            </span>
                            <div className="flex-shrink-0">
                              {expandedSchools.has(
                                school.databaseId.toString()
                              ) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(
                            school.databaseId.toString()
                          ) && (
                            <div className="ml-8 mt-2 space-y-0.5 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.databaseId}
                                  href={`/network/${club.slug}`}
                                  className="flex items-center justify-between rounded-full px-4 py-2 text-sm transition-all duration-200 hover:bg-cardinal-50/30"
                                  onClick={onClose}
                                >
                                  <span className="flex-1 text-slate-600 font-medium transition-colors hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                  {club.clubData?.membersCount && (
                                    <span className="ml-2 rounded-full bg-slate-100/80 px-2 py-0.5 text-xs text-slate-500 transition-colors group-hover:bg-cardinal-100/50 group-hover:text-cardinal-600">
                                      {club.clubData.membersCount} thành viên
                                    </span>
                                  )}
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="mx-4 flex items-center justify-center rounded-full bg-slate-50/50 px-4 py-3 text-sm text-slate-500 italic backdrop-blur-sm">
                                  Chưa có CLB
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Others Section */}
              <div>
                <button
                  onClick={() => toggleCategory("others")}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600 rounded-full"
                >
                  <span>Khác</span>
                  <div className="ml-2">
                    {expandedCategory === "others" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                {expandedCategory === "others" && (
                  <div className="space-y-1">
                    {schools
                      .filter(
                        (school) =>
                          !school.name?.startsWith("Trường") &&
                          !school.name?.startsWith("Khoa")
                      )
                      .map((school) => (
                        <div key={school.databaseId} className="rounded-lg">
                          <button
                            onClick={() =>
                              toggleSchool(school.databaseId.toString())
                            }
                            className="flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50/50 hover:text-cardinal-600"
                          >
                            <span className="flex-1 text-left truncate">
                              {school.name}
                            </span>
                            <div className="flex-shrink-0">
                              {expandedSchools.has(
                                school.databaseId.toString()
                              ) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(
                            school.databaseId.toString()
                          ) && (
                            <div className="ml-8 mt-2 space-y-0.5 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.databaseId}
                                  href={`/network/${club.slug}`}
                                  className="flex items-center justify-between rounded-full px-4 py-2 text-sm transition-all duration-200 hover:bg-cardinal-50/30"
                                  onClick={onClose}
                                >
                                  <span className="flex-1 text-slate-600 font-medium transition-colors hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="mx-4 flex items-center justify-center rounded-full bg-slate-50/50 px-4 py-3 text-sm text-slate-500 italic backdrop-blur-sm">
                                  Chưa có CLB
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Other Links */}
            {[
              { href: "/research", text: "Đề tài SVNCKH" },
              { href: "/partners", text: "Hợp tác đối ngoại" },
              { href: "/resources", text: "Tài nguyên" },
              { href: "/facilities", text: "Cơ sở vật chất" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  pathname === href
                    ? "bg-cardinal-50 text-cardinal-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-cardinal-600"
                }`}
                onClick={onClose}
              >
                {text}
              </Link>
            ))}

            {/* Admin Link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center rounded-lg px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-cardinal-600"
                onClick={onClose}
              >
                <Settings className="h-5 w-5 mr-2" />
                Quản trị
              </Link>
            )}
          </div>

          {/* External Links */}
          <div className="mt-6 border-t border-slate-200/60 pt-4">
            <div className="px-2">
              <a
                href="https://student.hust.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-full px-4 py-2.5 text-base font-medium text-slate-600 transition-all duration-200 hover:bg-cardinal-50/30 hover:text-cardinal-600"
                onClick={onClose}
              >
                <span>eHUST</span>
                <span className="text-xs text-slate-500">
                  (student.hust.edu.vn)
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
