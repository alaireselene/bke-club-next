"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  currentLang: string;
  onToggleLanguage: () => void;
}

export function NavigationMenu({ currentLang, onToggleLanguage }: Props) {
  const pathname = usePathname();
  // TODO: Get auth status
  const isAdmin = false;

  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {/* Base Links */}
      <Link
        href="/calendar"
        className={`flex items-center transition-colors hover:underline ${
          pathname === "/calendar" ? "text-cardinal-600" : "text-chalk-100"
        }`}
      >
        Lịch công tác
      </Link>
      <Link
        href="/contact"
        className={`flex items-center transition-colors hover:underline ${
          pathname === "/contact" ? "text-cardinal-600" : "text-chalk-100"
        }`}
      >
        Liên hệ
      </Link>

      {/* Admin Link */}
      {isAdmin && (
        <Link
          href="/admin"
          className={`flex items-center transition-colors hover:underline ${
            pathname === "/admin" ? "text-cardinal-600" : "text-chalk-100"
          }`}
        >
          <Settings className="h-4 w-4 mr-2" />
          Quản trị
        </Link>
      )}

      {/* Language Toggle */}
      <button
        onClick={onToggleLanguage}
        className="text-chalk-100 hover:underline"
      >
        {currentLang}
      </button>
    </nav>
  );
}
