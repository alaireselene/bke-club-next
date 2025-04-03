"use server";

import { directus, Post } from "@/lib/directus"; // Import directus client and Post type
import { readItems } from "@directus/sdk"; // Import readItems function

const PAGE_SIZE = 10; // Define how many posts to load per request

export async function loadMorePosts(offset: number) {
  try {
    const postsData = await directus.request(readItems('post', {
      fields: ['*'], // Ensure categories field is fetched
      sort: ['-date_created'], // Sort by creation date descending
      offset: offset,          // Start fetching from the offset
      limit: PAGE_SIZE,        // Fetch one page size
    }));

    const fetchedPosts = postsData as Post[];
    const hasMore = fetchedPosts.length === PAGE_SIZE;

    return {
      posts: fetchedPosts,
      pageInfo: { hasNextPage: hasMore }, // Return simplified pagination info
    };
  } catch (error) {
    console.error("Error loading more posts from Directus:", error);
    // Return an empty state or throw error based on desired handling
    return {
      posts: [],
      pageInfo: { hasNextPage: false },
    };
  }
}