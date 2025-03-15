"use client";

import Link from "next/link";
import {
  Settings,
  Calendar,
  Mail,
  Languages,
  GraduationCap,
} from "lucide-react";
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
        className={`flex items-center gap-2 transition-colors hover:underline ${
          pathname === "/calendar" ? "text-cardinal-600" : "text-chalk-100"
        }`}
      >
        <Calendar className="h-4 w-4" />
        Lịch công tác
      </Link>
      <Link
        href="/contact"
        className={`flex items-center gap-2 transition-colors hover:underline ${
          pathname === "/contact" ? "text-cardinal-600" : "text-chalk-100"
        }`}
      >
        <Mail className="h-4 w-4" />
        Liên hệ
      </Link>

      {/* Admin Link */}
      {isAdmin && (
        <Link
          href="/admin"
          className={`flex items-center gap-2 transition-colors hover:underline ${
            pathname === "/admin" ? "text-cardinal-600" : "text-chalk-100"
          }`}
        >
          <Settings className="h-4 w-4" />
          Quản trị
        </Link>
      )}

      {/* Language Toggle */}
      <button
        onClick={onToggleLanguage}
        className="flex items-center gap-2 text-chalk-100 hover:underline"
      >
        <Languages className="h-4 w-4" />
        {currentLang}
      </button>
    </nav>
  );
}
