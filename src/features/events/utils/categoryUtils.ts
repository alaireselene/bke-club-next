// Centralized event category mapping
export const eventCategories = [
  { slug: "competition", name: "Cuộc thi" },
  { slug: "symposium", name: "Hội nghị" },
  { slug: "research", name: "Nghiên cứu" },
  { slug: "cultural", name: "Văn hóa" },
  { slug: "workshop", name: "Workshop" },
];

// Create maps for efficient lookup
const slugToNameMap = new Map(eventCategories.map(cat => [cat.slug, cat.name]));
const nameToNameMap = new Map(eventCategories.map(cat => [cat.name, cat.name])); // Map name to itself

/**
 * Gets the display name for a category identifier (slug or name).
 * Prioritizes finding by slug, then by name.
 * Returns the identifier itself if not found, or a default.
 */
export function getCategoryDisplayName(identifier: string | null | undefined): string {
  if (!identifier) return "Sự kiện"; // Default display name

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
  if (!identifier) return "su-kien"; // Default slug

  // Find category object by slug or name
  const category = eventCategories.find(cat => cat.slug === identifier || cat.name === identifier);

  return category ? category.slug : "su-kien"; // Return found slug or default
}

export type EventCategory = typeof eventCategories[number];
