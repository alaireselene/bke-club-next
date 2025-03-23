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

export type { Category, TabButtonProps, CategoryTabsProps }