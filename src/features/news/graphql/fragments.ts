import { gql } from '@apollo/client';

export const NEWS_FIELDS = gql`
  fragment NewsFields on Post {
    id
    title
    slug
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`;