import { PARTNER_FIELDS } from "./fragments";
import { gql } from "@apollo/client";

export const GET_PARTNERS = gql`
  query GetPartners($first: Int, $after: String) {
    partners(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PartnerData
      }
    }
  }
  ${PARTNER_FIELDS}
`;

export const GET_PARTNER_BY_SLUG = gql`
  query GetPartnerBySlug($slug: ID!) {
    partner(id: $slug, idType: SLUG) {
      ...PartnerData
    }
  }
  ${PARTNER_FIELDS}
`;

