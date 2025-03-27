import { gql } from '@apollo/client';

import { FEATURED_IMAGE_FIELDS } from '@/lib/graphql/fragments';

export const NEWS_FIELDS = gql`
  fragment NewsFields on Post {
    title
    slug
    excerpt
    ...FeaturedImageFields
    categories {
      nodes {
        name
      }
    }
  },
  ${FEATURED_IMAGE_FIELDS}
`;