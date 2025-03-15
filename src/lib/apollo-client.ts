import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import type { Post, Club } from '@/types/wordpress';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Handle pagination for posts
          posts: {
            keyArgs: ['where'],
            merge(existing: { nodes: Post[] } | undefined, incoming: { nodes: Post[] }, { args }) {
              if (!args) return incoming;

              // Create a Set of IDs to prevent duplicates
              const seenIds = new Set<string>();
              const merged = existing ? existing.nodes : [];

              // Add existing IDs to Set
              merged.forEach((node: Post) => seenIds.add(node.id));

              // Only add nodes that haven't been seen
              const newNodes = incoming.nodes.filter((node: Post) => !seenIds.has(node.id));

              return {
                ...incoming,
                nodes: [...merged, ...newNodes],
              };
            },
          },
          // Handle pagination for clubs
          clubs: {
            keyArgs: ['where'],
            merge(existing: { nodes: Club[] } | undefined, incoming: { nodes: Club[] }) {
              // Create a Set of IDs to prevent duplicates
              const seenIds = new Set<string>();
              const merged = existing ? existing.nodes : [];

              // Add existing IDs to Set
              merged.forEach((node: Club) => seenIds.add(node.id));

              // Only add nodes that haven't been seen
              const newNodes = incoming.nodes.filter((node: Club) => !seenIds.has(node.id));

              return {
                ...incoming,
                nodes: [...merged, ...newNodes],
              };
            },
          },
        },
      },
      // Add type policy for Club type
      Club: {
        keyFields: ['id', 'databaseId'],
        fields: {
          clubData: {
            merge(existing, incoming) {
              return {
                ...existing,
                ...incoming,
                // Preserve nested objects
                president: incoming?.president || existing?.president,
                advisors: incoming?.advisors || existing?.advisors,
              };
            },
          },
        },
      },
      // Add type policy for ClubData type
      ClubData: {
        merge(existing, incoming) {
          return {
            ...existing,
            ...incoming,
          };
        },
      },
    },
  }),
});

// Server-side client
let clientSide: typeof client | undefined;

export function getClient() {
  if (typeof window === 'undefined') {
    // Server-side: Always create a new client
    return client;
  }
  // Client-side: Reuse client across requests
  if (!clientSide) clientSide = client;
  return clientSide;
}