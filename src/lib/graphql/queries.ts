import { gql } from '@apollo/client';


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

export const GET_PARTNERS = gql`
  query GetPartners($first: Int!, $after: String) {
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

// Category Query
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        name
        slug
        ancestors {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`;

// Post/News Queries
export const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: "news"
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        date
        categories {
          nodes {
            databaseId
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          title
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

// Event Fragment
export const EVENT_FIELDS = gql`
  fragment EventData on Post {
    eventData {
      eventTime {
        eventStartTime
        eventEndTime
      }
      location
      capacity
      delivery
      registerLink
      organizer {
        name
        email
        logo {
          node {
            sourceUrl
            altText
            title
          }
        }
      }
      sponsors {
        name
        website
        logo {
          node {
            sourceUrl
            altText
            title
          }
        }
      }
    }
  }
`;

// Event List Query
export const GET_EVENTS = gql`
  query GetEvents($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: "event"
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
        node {
          sourceUrl
          altText
          title
        }
      }
        ...EventData
      }
    }
  }
  ${EVENT_FIELDS}
`;

// Event Queries
export const GET_EVENT_BY_SLUG = gql`
  query GetEventBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          title
        }
      }
      ...EventData
    }
  }
  ${EVENT_FIELDS}
`;

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

// Club Queries
export const GET_CLUBS = gql`
  query GetClubs($first: Int!, $after: String) {
    clubs(first: $first, after: $after) {
      nodes {
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
        clubData {
          establishedYear
          membersCount
          president {
            presidentName
            presidentEmail
          }
          advisors {
            advisorName
            advisorEmail
          }
        }
        schools {
          nodes {
            id
            databaseId
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_CLUB_BY_SLUG = gql`
  query GetClubBySlug($slug: ID!) {
    club(id: $slug, idType: SLUG) {
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
      clubData {
        establishedYear
        membersCount
        president {
          presidentName
          presidentEmail
        }
        advisors {
          advisorName
          advisorEmail
        }
      }
      schools {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
    }
  }
`;