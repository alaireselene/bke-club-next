"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

export interface BreadcrumbSegment {
  text: string;
  href: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbSegment[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = useMemo(() => {
    // Don't show breadcrumb on home page
    if (pathname === "/") {
      return [];
    }

    // Use provided items if available
    if (items) {
      return items;
    }

    // Create segments from pathname
    return pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        text:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: "/" + array.slice(0, index + 1).join("/"),
      }));
  }, [pathname, items]);

  if (segments.length === 0 && !items) {
    return null;
  }

  return (
    <nav className={`${className}`} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center text-sm [&>li:last-child]:after:hidden">
        <li
          className="inline-flex items-center relative after:absolute after:-right-4 after:top-1/2 after:-translate-y-px after:h-px after:w-8 after:bg-gradient-to-r after:from-white/30 after:to-transparent"
          style={{
            animation: "fadeIn 0.5s ease-out forwards",
            opacity: 0,
          }}
        >
          <Link
            href="/"
            className="group inline-flex items-center px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Home"
          >
            <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </Link>
        </li>

        {segments.map((segment, index) => (
          <li
            key={segment.href}
            className="flex items-center relative after:absolute after:-right-4 after:top-1/2 after:-translate-y-px after:h-px after:w-8 after:bg-gradient-to-r after:from-white/30 after:to-transparent"
            style={{
              animation: "fadeIn 0.5s ease-out forwards",
              animationDelay: `${500 + index * 100}ms`,
              opacity: 0,
            }}
          >
            {index === segments.length - 1 ? (
              <span
                className="px-2 py-0.5 bg-white/10 rounded-lg font-medium backdrop-blur-sm"
                aria-current="page"
              >
                {segment.text}
              </span>
            ) : (
              <>
                <Link
                  href={segment.href}
                  className="group px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="group-hover:scale-[1.02] transition-transform duration-200">
                    {segment.text}
                  </span>
                </Link>
                <ChevronRight className="h-4 w-4 opacity-60 ml-2" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
