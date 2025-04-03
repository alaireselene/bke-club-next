// Import the Post type directly from the Directus definition
import type { Post as DirectusPost } from "@/lib/directus";

// Re-export the Directus Post type as News for use within this feature
export type News = DirectusPost;

// Note: The original type had 'excerpt'. The Directus 'Post' schema doesn't.
// If an excerpt is needed, it might need to be derived from 'content' or added to the Directus schema.
// The original type also had complex 'categories'. Directus 'Post' has 'categories: "json"'.
// Components using this type will need to handle the JSON string or parsed array.