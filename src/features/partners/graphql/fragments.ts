import { gql } from "@apollo/client";

// Partner Fragments & Queries
export const PARTNER_FIELDS = gql`
  fragment PartnerData on Partner {
    id
    databaseId
    slug
    title
    content
    featuredImage {
        node {
          sourceUrl
          altText
          title
        }
      }
    partnerData {
      region
      type
      website
    }
  }
`;