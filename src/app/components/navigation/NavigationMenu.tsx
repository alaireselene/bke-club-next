"use client";

import Link from "next/link";
import { Calendar, Mail, Search } from "lucide-react";

type Props = {
  currentLang: string;
  onToggleLanguage: () => void;
};

export function NavigationMenu({ currentLang, onToggleLanguage }: Props) {
  return (
    <div className="hidden items-center space-x-6 md:flex">
      <Link
        href="/calendar"
        className="group focus:ring-chalk-100 text-chalk-100 flex items-center transition-colors hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Lịch công tác"
      >
        <span className="flex items-center">
          <Calendar className="h-5 w-5" />
          Lịch công tác
        </span>
      </Link>

      <Link
        href="/contact"
        className="group focus:ring-chalk-600 text-chalk-100 flex items-center transition-colors hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Liên hệ"
      >
        <span className="flex items-center">
          <Mail className="h-5 w-5" />
          Liên hệ
        </span>
      </Link>

      <button
        className="focus:ring-cardinal-600 text-chalk-100 transition-colors hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Tìm kiếm"
      >
        <Search className="h-5 w-5" />
      </button>

      <button
        className="border-cardinal-200 bg-chalk-100 text-cardinal-600 hover:bg-cardinal-50 hover:border-cardinal-300 active:bg-cardinal-100 focus:ring-cardinal-600 rounded-md border px-3 py-1.5 text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
        onClick={onToggleLanguage}
        aria-label={`Switch to ${
          currentLang === "VI" ? "English" : "Vietnamese"
        }`}
      >
        {currentLang}
      </button>
    </div>
  );
}
