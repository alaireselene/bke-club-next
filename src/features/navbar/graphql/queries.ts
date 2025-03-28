import { gql } from '@apollo/client';
import { CLUB_DATA_FIELDS } from '@/features/network/graphql/fragments';
import { FEATURED_IMAGE_FIELDS } from '@/lib/graphql/fragments';
import { CONTENT_NODE_FIELDS } from '@/lib/graphql/fragments';

export const GET_NAVIGATION_DATA = gql`
  query GetNavigationData {
    schools {
      nodes {
        databaseId
        name
        slug
        clubs {
          nodes {
            title
            ...ContentNodeFields
            ...ClubDataFields
            ...FeaturedImageFields
          }
        }
      }
    }
  },
  ${CLUB_DATA_FIELDS}
  ${FEATURED_IMAGE_FIELDS}
  ${CONTENT_NODE_FIELDS}
`;
