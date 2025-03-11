"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  onSelect: (categoryId: string | null) => void;
  defaultSelected?: string | null;
}

export function CategoryTabs({
  categories,
  onSelect,
  defaultSelected = null,
}: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultSelected
  );

  const handleSelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onSelect(categoryId);
  };

  return (
    <nav className="mb-8">
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
            key={category.id}
            className={`btn btn-sm ${
              selectedCategory === category.id ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => handleSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
