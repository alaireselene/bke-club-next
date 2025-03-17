"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  icon?: LucideIcon;
  count?: number;
}

interface TabButtonProps {
  category?: Category;
  isAll?: boolean;
  name?: string;
}

interface CategoryTabsProps {
  categories: Category[];
  onSelect: (categorySlug: string | null) => void;
  defaultSelected?: string | null;
  className?: string;
  variant?: "pills" | "underline" | "minimal";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function CategoryTabs({
  categories,
  onSelect,
  defaultSelected = null,
  className = "",
  variant = "pills",
  size = "md",
  fullWidth = false,
}: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultSelected
  );

  const baseClasses =
    "relative inline-flex items-center gap-1.5 transition-all duration-200";
  const focusClasses =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cardinal-500 focus-visible:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-1.5 text-base",
    lg: "px-5 py-2 text-lg",
  };

  const variantClasses = {
    pills: {
      nav: "flex flex-wrap gap-2",
      tab: {
        default:
          "rounded-full hover:text-cardinal-600 backdrop-blur-sm transition-all duration-200",
        selected:
          "bg-cardinal-600/90 text-white rounded-full hover:bg-cardinal-600 shadow-md hover:shadow-lg hover:scale-[1.02]",
        notSelected:
          "bg-white/80 text-charcoal-600 hover:bg-white/90 shadow-sm hover:shadow-md hover:scale-[1.02]",
      },
    },
    underline: {
      nav: "flex overflow-x-auto scrollbar-none -mx-4 px-4 border-b border-charcoal-200",
      tab: {
        default: "border-b-2 border-transparent -mb-px",
        selected: "border-cardinal-600 text-cardinal-600",
        notSelected:
          "text-charcoal-600 hover:text-cardinal-600 hover:border-cardinal-300",
      },
    },
    minimal: {
      nav: "flex flex-wrap gap-1",
      tab: {
        default: "rounded-lg",
        selected: "bg-cardinal-50 text-cardinal-600 font-medium",
        notSelected: "text-charcoal-600 hover:bg-charcoal-50",
      },
    },
  };

  const handleSelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onSelect(categorySlug);
  };

  const TabButton = ({ category, isAll = false, name }: TabButtonProps) => {
    const isSelected = isAll
      ? selectedCategory === null
      : selectedCategory === category?.slug;
    const Icon = category?.icon;

    return (
      <button
        type="button"
        onClick={() => handleSelect(isAll ? null : category?.slug ?? null)}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant].tab.default,
          isSelected
            ? variantClasses[variant].tab.selected
            : variantClasses[variant].tab.notSelected,
          focusClasses,
          "group whitespace-nowrap animate-fade-in motion-reduce:animate-none"
        )}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${isAll ? "all" : category?.slug}`}
      >
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        <span>{isAll ? name || "Tất cả" : category?.name}</span>
        {category?.count !== undefined && (
          <span
            className={cn(
              "ml-1 rounded-full px-1.5 py-0.5 text-xs font-medium",
              isSelected
                ? "bg-white/20 text-white"
                : "bg-charcoal-100 text-charcoal-600"
            )}
          >
            {category.count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={className}>
      <nav
        className={cn(
          variantClasses[variant].nav,
          fullWidth && "w-full justify-between",
          "relative"
        )}
        role="tablist"
        aria-label="Category filters"
      >
        <TabButton isAll name="Tất cả" />
        {categories.map((category) => (
          <TabButton key={category.slug} category={category} />
        ))}
      </nav>
    </div>
  );
}
