// Centralized category mapping
export const newsCategories = [
  { slug: "scholarship", name: "Học bổng - Trao đổi" },
  { slug: "research", name: "Nghiên cứu" },
  { slug: "achievement", name: "Thành tựu" },
  { slug: "announcement", name: "Thông báo" },
];

// Create maps for efficient lookup
const slugToNameMap = new Map(newsCategories.map(cat => [cat.slug, cat.name]));
const nameToNameMap = new Map(newsCategories.map(cat => [cat.name, cat.name])); // Map name to itself

/**
 * Gets the display name for a category identifier (slug or name).
 * Prioritizes finding by slug, then by name.
 * Returns the identifier itself if not found, or a default.
 */
export function getCategoryDisplayName(identifier: string | null | undefined): string {
  if (!identifier) return "Tin tức"; // Default display name

  // Check if the identifier is a known slug
  if (slugToNameMap.has(identifier)) {
    return slugToNameMap.get(identifier)!;
  }

  // Check if the identifier is a known display name
  if (nameToNameMap.has(identifier)) {
    return nameToNameMap.get(identifier)!;
  }

  // If not found in maps, return the identifier itself (assuming it might be a display name not in the map)
  // Or return a default if preferred
  console.warn(`Category identifier "${identifier}" not found in mapping. Displaying as is.`);
  return identifier;
}

/**
 * Gets the slug for a category identifier (slug or name).
 * Returns a default slug if not found.
 */
export function getCategorySlug(identifier: string | null | undefined): string {
    if (!identifier) return "tin-tuc"; // Default slug

    // Find category object by slug or name
    const category = newsCategories.find(cat => cat.slug === identifier || cat.name === identifier);

    return category ? category.slug : "tin-tuc"; // Return found slug or default
}

export type NewsCategory = typeof newsCategories[number];