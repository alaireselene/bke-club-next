"use client";

import Link from "next/link";
import { Settings, Calendar, Mail, Languages } from "lucide-react";
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
    <nav className="hidden md:block">
      <div className="flex items-center space-x-6 rounded-full bg-white/10 px-6 py-2 backdrop-blur-md">
        {/* Base Links */}
        <Link
          href="/calendar"
          className={`flex items-center gap-2 transition-all duration-200 hover:text-cardinal-400 ${
            pathname === "/calendar" ? "text-cardinal-500" : "text-chalk-100"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span className="font-medium">Lịch công tác</span>
        </Link>
        <Link
          href="/contact"
          className={`flex items-center gap-2 transition-all duration-200 hover:text-cardinal-400 ${
            pathname === "/contact" ? "text-cardinal-500" : "text-chalk-100"
          }`}
        >
          <Mail className="h-4 w-4" />
          <span className="font-medium">Liên hệ</span>
        </Link>

        {/* Admin Link */}
        {isAdmin && (
          <Link
            href="/admin"
            className={`flex items-center gap-2 transition-all duration-200 hover:text-cardinal-400 ${
              pathname === "/admin" ? "text-cardinal-500" : "text-chalk-100"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span className="font-medium">Quản trị</span>
          </Link>
        )}

        {/* Language Toggle */}
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-2 text-chalk-100 transition-all duration-200 hover:text-cardinal-400"
        >
          <Languages className="h-4 w-4" />
          <span className="font-medium">{currentLang}</span>
        </button>
      </div>
    </nav>
  );
}
