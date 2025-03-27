import { gql } from "@apollo/client";
import { SCHOOL_FIELDS, CLUB_DATA_FIELDS } from "./fragments";
import { FEATURED_IMAGE_FIELDS, PAGE_INFO_FIELDS } from "@/lib/graphql/fragments";

export const GET_CLUBS = gql`
  query GetClubs($first: Int, $after: String) {
    clubs(first: $first, after: $after) {
      nodes {
        databaseId
        slug
        title
        content
        ...FeaturedImageFields
        ...ClubDataFields
        schools {
          nodes {
            ...SchoolFields
          }
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  },
  ${CLUB_DATA_FIELDS}
  ${SCHOOL_FIELDS}
  ${FEATURED_IMAGE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_CLUB_BY_SLUG = gql`
  query GetClubBySlug($slug: ID!) {
    club(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      content
      ...FeaturedImageFields
      ...ClubDataFields
      schools {
        nodes {
          ...SchoolFields
        }
      }
    }
  },
  ${FEATURED_IMAGE_FIELDS}
  ${CLUB_DATA_FIELDS}
  ${SCHOOL_FIELDS}
`;

