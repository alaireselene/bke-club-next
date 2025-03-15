"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbSegment {
  text: string;
  href: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbSegment[];
  className?: string;
  variant?: "light" | "dark";
}

export function Breadcrumb({
  items,
  className,
  variant = "light",
}: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = useMemo(() => {
    if (pathname === "/") return [];
    if (items) return items;

    return pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        text:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: "/" + array.slice(0, index + 1).join("/"),
      }));
  }, [pathname, items]);

  if (segments.length === 0 && !items) return null;

  const baseTextColor =
    variant === "light" ? "text-white" : "text-charcoal-600";
  const separatorColor =
    variant === "light" ? "bg-white/30" : "bg-charcoal-200";
  const hoverBgColor =
    variant === "light" ? "hover:bg-white/10" : "hover:bg-charcoal-100";
  const activeBgColor = variant === "light" ? "bg-white/10" : "bg-charcoal-100";

  return (
    <nav className={cn("relative", className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm md:gap-3 [&>li]:first:pl-0">
        <li className="animate-fade-in">
          <Link
            href="/"
            className={cn(
              "group inline-flex items-center gap-1 rounded-lg px-2 py-1",
              baseTextColor,
              hoverBgColor,
              "transition-all duration-200"
            )}
            aria-label="Home"
          >
            <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </Link>
          <ChevronRight
            className={cn("ml-2 h-4 w-4 opacity-40", baseTextColor)}
            aria-hidden="true"
          />
        </li>

        {segments.map((segment, index) => (
          <li
            key={segment.href}
            className={cn(
              "flex items-center",
              "animate-fade-in [animation-delay:150ms]"
            )}
          >
            {index === segments.length - 1 ? (
              <span
                className={cn(
                  "rounded-lg px-2 py-1 font-medium backdrop-blur-sm",
                  activeBgColor,
                  baseTextColor
                )}
                aria-current="page"
              >
                {segment.text}
              </span>
            ) : (
              <>
                <Link
                  href={segment.href}
                  className={cn(
                    "group rounded-lg px-2 py-1",
                    baseTextColor,
                    hoverBgColor,
                    "transition-all duration-200"
                  )}
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    {segment.text}
                  </span>
                </Link>
                <ChevronRight
                  className={cn("ml-2 h-4 w-4 opacity-40", baseTextColor)}
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
