import { gql } from '@apollo/client';

// Event Fragment
// Navigation Query
export const GET_NAVIGATION_DATA = gql`
  query GetNavigationData {
    schools(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        clubs(first: 50) {
          nodes {
            id
            databaseId
            title
            slug
            clubData {
              establishedYear
              membersCount
              president {
                presidentName
              }
              advisors {
                advisorName
                advisorEmail
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
              }
            }
          }
        }
      }
    }
  }
`;
