"use client";

import { useState } from "react";

interface Category {
  slug: string; // Changed from id to slug to match WordPress
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  onSelect: (categorySlug: string | null) => void; // Updated to use categorySlug
  defaultSelected?: string | null;
  className?: string;
}

export function CategoryTabs({
  categories,
  onSelect,
  defaultSelected = null,
  className = "",
}: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultSelected
  );

  const handleSelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    onSelect(categorySlug);
  };

  return (
    <nav className={`mb-8 ${className}`}>
      <div className="flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${
            selectedCategory === null ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => handleSelect(null)}
        >
          Toàn bộ
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`btn btn-sm ${
              selectedCategory === category.slug ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => handleSelect(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
