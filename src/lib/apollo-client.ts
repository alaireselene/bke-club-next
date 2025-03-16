import { ApolloClient, InMemoryCache, createHttpLink, DefaultOptions, WatchQueryFetchPolicy } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  credentials: 'same-origin',
});

const cache = new InMemoryCache({
  resultCaching: false
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache' as WatchQueryFetchPolicy,
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

export const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions
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