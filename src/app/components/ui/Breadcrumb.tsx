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

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav className={`mb-4 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-base-content/60 hover:text-primary transition-colors"
            aria-label="Home"
          >
            <Home className="inline-block h-5 w-5 stroke-current" />
          </Link>
        </li>

        <li>
          <ChevronRight className="h-5 w-5 text-base-content/40" />
        </li>

        {segments.map((segment, index) => (
          <li key={segment.href} className="flex items-center">
            {index === segments.length - 1 ? (
              <span
                className="font-medium text-base-content"
                aria-current="page"
              >
                {segment.text}
              </span>
            ) : (
              <>
                <Link
                  href={segment.href}
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  {segment.text}
                </Link>
                <ChevronRight className="h-5 w-5 text-base-content/40 ml-2" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
