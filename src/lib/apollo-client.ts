import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
});

const cache = new InMemoryCache({
  typePolicies: {
    RootQuery: {
      queryType: true,
    },
    RootMutation: {
      mutationType: true,
    },
  },
});


export const client = new ApolloClient({
  link: httpLink,
  cache,
});

export function getClient() {
  return client;
}