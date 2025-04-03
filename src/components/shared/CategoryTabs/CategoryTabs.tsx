"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryTabsProps, TabButtonProps } from "./types";

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
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"; // Use theme ring color

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
          "rounded-full hover:text-primary backdrop-blur-sm transition-all duration-200", // Use theme color
        selected:
          "bg-primary/90 text-primary-foreground rounded-full hover:bg-primary shadow-md hover:shadow-lg hover:scale-[1.02]", // Use theme colors
        notSelected:
          "bg-background/80 text-muted-foreground hover:bg-background/90 shadow-sm hover:shadow-md hover:scale-[1.02]", // Use theme colors
      },
    },
    underline: {
      nav: "flex overflow-x-auto scrollbar-none -mx-4 px-4 border-b border-border", // Use theme border color
      tab: {
        default: "border-b-2 border-transparent -mb-px",
        selected: "border-primary text-primary", // Use theme color
        notSelected:
          "text-muted-foreground hover:text-primary hover:border-primary/50", // Use theme colors
      },
    },
    minimal: {
      nav: "flex flex-wrap gap-1",
      tab: {
        default: "rounded-lg",
        selected: "bg-primary/10 text-primary font-medium", // Use theme color
        notSelected: "text-muted-foreground hover:bg-muted/50", // Use theme colors
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
                ? "bg-primary-foreground/20 text-primary-foreground" // Use theme colors
                : "bg-muted text-muted-foreground" // Use theme colors
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
