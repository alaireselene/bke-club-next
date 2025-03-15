"use client";

import Link from "next/link";
import { X, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import type { School } from "@/types/wordpress";
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
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out`}
    >
      {/* Backdrop */}
      <div
        className="bg-opacity-75 absolute inset-0 bg-cardinal-800 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <div
        className="absolute right-0 h-full w-[90%] max-w-md transform overflow-y-auto bg-white shadow-xl transition-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-cardinal-600 px-4">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-medium text-cardinal-600">Menu</div>
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                className="rounded-md px-2 py-1 text-sm font-medium text-cardinal-600 hover:bg-cardinal-50"
              >
                {currentLang}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-cardinal-600 hover:bg-cardinal-50 hover:text-cardinal-700 focus:outline-none focus:ring-2 focus:ring-cardinal-500"
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
              { href: "/events", text: "Sự kiện" },
              { href: "/news", text: "Tin tức" },
              { href: "/calendar", text: "Lịch công tác" },
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

            {/* Network Section */}
            <div className="relative space-y-2 py-4">
              <div className="px-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Mạng lưới
              </div>

              {/* Schools Section */}
              <div>
                <button
                  onClick={() => toggleCategory("schools")}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
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
                        <div key={school.id} className="rounded-lg">
                          <button
                            onClick={() => toggleSchool(school.id)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                          >
                            <span>{school.name}</span>
                            <div className="ml-2">
                              {expandedSchools.has(school.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(school.id) && (
                            <div className="ml-11 mt-1 space-y-1 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.id}
                                  href={`/network/${club.slug}`}
                                  className="block px-3 py-1 text-sm"
                                  onClick={onClose}
                                >
                                  <span className="flex-1 text-slate-600 hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                  {club.clubData?.membersCount && (
                                    <span className="ml-2 text-xs text-slate-400 whitespace-nowrap">
                                      {club.clubData.membersCount} thành viên
                                    </span>
                                  )}
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="px-3 py-2 text-sm text-slate-500 italic">
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
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
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
                        <div key={school.id} className="rounded-lg">
                          <button
                            onClick={() => toggleSchool(school.id)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                          >
                            <span>{school.name}</span>
                            <div className="ml-2">
                              {expandedSchools.has(school.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(school.id) && (
                            <div className="ml-11 mt-1 space-y-1 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.id}
                                  href={`/network/${club.slug}`}
                                  className="flex items-center justify-between px-3 py-1 text-sm"
                                  onClick={onClose}
                                >
                                  <span className="text-slate-600 hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                  {club.clubData?.membersCount && (
                                    <span className="text-xs text-slate-400">
                                      {club.clubData.membersCount} thành viên
                                    </span>
                                  )}
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="px-3 py-2 text-sm text-slate-500 italic">
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
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
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
                        <div key={school.id} className="rounded-lg">
                          <button
                            onClick={() => toggleSchool(school.id)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                          >
                            <span>{school.name}</span>
                            <div className="ml-2">
                              {expandedSchools.has(school.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedSchools.has(school.id) && (
                            <div className="ml-11 mt-1 space-y-1 pb-2">
                              {school.clubs?.nodes.map((club) => (
                                <Link
                                  key={club.id}
                                  href={`/network/${club.slug}`}
                                  className="flex items-center justify-between px-3 py-1 text-sm"
                                  onClick={onClose}
                                >
                                  <span className="text-slate-600 hover:text-cardinal-600">
                                    {club.title}
                                  </span>
                                </Link>
                              ))}
                              {(!school.clubs?.nodes ||
                                school.clubs.nodes.length === 0) && (
                                <div className="px-3 py-2 text-sm text-slate-500 italic">
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
              { href: "/research", text: "Sinh viên NCKH" },
              { href: "/resources", text: "Tài nguyên" },
              { href: "/facilities", text: "Cơ sở vật chất" },
              { href: "/contact", text: "Liên hệ" },
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
          <div className="mt-6 border-t border-slate-200 pt-4">
            <a
              href="https://student.hust.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-cardinal-600"
              onClick={onClose}
            >
              <span>eHUST</span>
              <span className="text-xs">(student.hust.edu.vn)</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
