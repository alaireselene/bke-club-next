"use client"

import { cn } from "@/lib/utils"

interface CategoriesFilterProps {
  categories: string[]
  selectedCategory?: string
  onCategoryChange: (category: string) => void
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

export function CategoriesFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
  activeClassName = "bg-red-500 text-white",
  inactiveClassName = "bg-gray-100 hover:bg-gray-200",
}: CategoriesFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-3 py-1 text-sm rounded-md transition-colors",
            selectedCategory === category ? activeClassName : inactiveClassName,
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
