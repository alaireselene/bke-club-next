import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

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
            merge(existing, incoming, { args }) {
              if (!args) return incoming;
              const merged = existing ? existing.nodes : [];
              return {
                ...incoming,
                nodes: [...merged, ...incoming.nodes],
              };
            },
          },
          // Handle pagination for clubs
          clubs: {
            keyArgs: ['where'],
            merge(existing, incoming) {
              const merged = existing ? existing.nodes : [];
              return {
                ...incoming,
                nodes: [...merged, ...incoming.nodes],
              };
            },
          },
        },
      },
      // Add type policy for Club type
      Club: {
        keyFields: ['id', 'databaseId'],
        fields: {
          clubFields: {
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
      // Add type policy for ClubFields type
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