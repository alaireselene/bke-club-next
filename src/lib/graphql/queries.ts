import { gql } from '@apollo/client';

// Common Fragments
export const MEDIA_FIELDS = gql`
  fragment MediaFields on MediaItem {
    sourceUrl
    altText
    title
  }
`;

export const FEATURED_IMAGE_FIELDS = gql`
  fragment FeaturedImageFields on NodeWithFeaturedImage {
    featuredImage {
      node {
        ...MediaFields
      }
    }
  }
  ${MEDIA_FIELDS}
`;

// Partner Fragments & Queries
export const PARTNER_FIELDS = gql`
  fragment PartnerFields on Partner {
    id
    databaseId
    slug
    title
    content
    ...FeaturedImageFields
    partnerData {
      region
      type
      website
    }
  }
  ${FEATURED_IMAGE_FIELDS}
`;

export const GET_PARTNERS = gql`
  query GetPartners($first: Int!, $after: String) {
    partners(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PartnerFields
      }
    }
  }
  ${PARTNER_FIELDS}
`;

export const GET_PARTNER_BY_SLUG = gql`
  query GetPartnerBySlug($slug: ID!) {
    partner(id: $slug, idType: SLUG) {
      ...PartnerFields
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
        categoryNotIn: ["event"]
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
        ...FeaturedImageFields
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
  ${FEATURED_IMAGE_FIELDS}
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      ...FeaturedImageFields
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
  ${FEATURED_IMAGE_FIELDS}
`;

// Event Fragment
export const EVENT_FIELDS = gql`
  fragment EventFields on Post {
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
          ...MediaFields
        }
      }
      sponsors {
        name
        website
        logo {
          ...MediaFields
        }
      }
    }
  }
  ${MEDIA_FIELDS}
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
        ...FeaturedImageFields
        ...EventFields
      }
    }
  }
  ${FEATURED_IMAGE_FIELDS}
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
      ...FeaturedImageFields
      ...EventFields
    }
  }
  ${FEATURED_IMAGE_FIELDS}
  ${EVENT_FIELDS}
`;

// Navigation Query
export const GET_NAVIGATION_DATA = gql`
  query GetNavigationData {
    schools {
      nodes {
        id
        databaseId
        name
        slug
        clubs {
          nodes {
            id
            databaseId
            title
            slug
            clubData {
              membersCount
            }
          }
        }
      }
    }
  }
  ${FEATURED_IMAGE_FIELDS}
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
        ...FeaturedImageFields
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
        school {
          node {
            id
            databaseId
            name
            slug
          }
        }
      }
    }
  }
  ${FEATURED_IMAGE_FIELDS}
`;

export const GET_CLUB_BY_SLUG = gql`
  query GetClubBySlug($slug: ID!) {
    club(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      content
      ...FeaturedImageFields
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
      school {
        node {
          id
          databaseId
          name
          slug
        }
      }
    }
  }
  ${FEATURED_IMAGE_FIELDS}
`;