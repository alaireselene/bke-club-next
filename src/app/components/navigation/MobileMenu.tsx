"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { School, Club } from "./types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  clubsBySchool: Record<number, Club[]>;
};

export function MobileMenu({ isOpen, onClose, schools, clubsBySchool }: Props) {
  const pathname = usePathname();

  return (
    <div
      id="mobile-menu"
      className={`mobile-menu fixed inset-0 z-30 transform md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out`}
    >
      <div
        className="bg-opacity-75 absolute inset-0 bg-slate-600 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 h-full w-64 transform overflow-y-auto bg-white shadow-xl transition-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-4">
          <div className="text-lg font-medium text-slate-900">Menu</div>
          <button
            onClick={onClose}
            className="focus:ring-cardinal-600 hover:text-cardinal-600 rounded-md p-2 text-slate-600 hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Close menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-2 py-3">
          <div className="space-y-1">
            {/* Basic Links */}
            {[
              { href: "/calendar", text: "Lịch công tác" },
              { href: "/contact", text: "Liên hệ" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-cardinal-600 block rounded-md px-3 py-2 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 ${
                  pathname === href ? "text-cardinal-600 bg-slate-50" : ""
                }`}
                aria-current={pathname === href ? "page" : undefined}
                onClick={onClose}
              >
                {text}
              </Link>
            ))}

            <div className="my-4 border-t border-slate-200" />

            {/* About Section */}
            <div className="mb-2">
              <div className="px-3 py-2 text-base font-medium text-slate-700">
                Giới thiệu
              </div>
              <div className="ml-4">
                <Link
                  href="/about"
                  className={`hover:text-cardinal-600 block py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 ${
                    pathname === "/about" ? "text-cardinal-600 bg-slate-50" : ""
                  }`}
                  onClick={onClose}
                >
                  Tổng quan
                </Link>
                <Link
                  href="/about/structure"
                  className={`hover:text-cardinal-600 block py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 ${
                    pathname === "/about/structure"
                      ? "text-cardinal-600 bg-slate-50"
                      : ""
                  }`}
                  onClick={onClose}
                >
                  Cơ cấu tổ chức
                </Link>
              </div>
            </div>

            {/* Network Section */}
            <div className="my-2">
              <div className="px-3 py-2 text-base font-medium text-slate-700">
                Mạng lưới
              </div>
              {schools.map((school) => (
                <div key={school.id} className="mb-3 ml-4">
                  <Link
                    href={`/network?school=${school.slug.toUpperCase()}`}
                    className="hover:text-cardinal-600 block py-2 text-sm font-medium text-slate-600"
                    onClick={onClose}
                  >
                    {school.name}
                    <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {school.slug.toUpperCase()}
                    </span>
                  </Link>
                  <div className="ml-4">
                    {(clubsBySchool[school.id] || []).map((club) => (
                      <Link
                        key={club.id}
                        href={`/network/${club.slug}`}
                        className="hover:text-cardinal-600 block py-1.5 text-sm text-slate-600"
                        onClick={onClose}
                      >
                        {club.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Other Links */}
            {[
              { href: "/research", text: "Sinh viên NCKH" },
              { href: "/resources", text: "Tài nguyên" },
              { href: "/facilities", text: "Cơ sở vật chất" },
            ].map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-cardinal-600 block rounded-md px-3 py-2 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 ${
                  pathname === href ? "text-cardinal-600 bg-slate-50" : ""
                }`}
                aria-current={pathname === href ? "page" : undefined}
                onClick={onClose}
              >
                {text}
              </Link>
            ))}

            <a
              href="https://student.hust.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cardinal-600 mt-2 block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-50"
              aria-label="Open eHUST in new tab"
              onClick={onClose}
            >
              eHUST
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
