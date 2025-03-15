# WordPress Integration Documentation

## Overview

This project uses WordPress as a headless CMS with GraphQL API. Data is fetched using Apollo Client and TypeScript types are used to ensure type safety.

## Data Structure

### Base Types

- `Node`: Base interface with common WordPress fields
  ```typescript
  interface Node {
    id: string; // GraphQL node ID
    databaseId: number; // WordPress post/term ID
    slug?: string; // URL-friendly name
  }
  ```

### Content Types

#### Posts

Regular blog posts and news items:

```typescript
interface Post {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  author?: {
    node: {
      name: string;
    };
  };
}
```

#### Events

Events extend the Post type with additional fields:

```typescript
interface Event extends Post {
  eventFields: {
    eventStartTime: string;
    eventEndTime: string;
    location: string;
    capacity: number;
    delivery: "virtual" | "onsite";
    registerUrl?: string;
    organizer: {
      name: string;
      email: string;
      logo?: { sourceUrl: string };
    };
    sponsors?: Array<{
      name: string;
      website: string;
      logo?: { sourceUrl: string };
    }>;
  };
}
```

#### Schools and Clubs

Network structure:

```typescript
interface School {
  name: string;
  description?: string;
  featuredImage?: FeaturedImage;
  clubs: {
    nodes: Club[];
  };
}

interface Club {
  title: string;
  content: string;
  featuredImage?: FeaturedImage;
  clubFields: {
    establishedYear: string;
    membersCount: number;
    president: {
      presidentName: string;
      presidentEmail: string;
    };
    advisors: Array<{
      advisorName: string;
      advisorEmail: string;
    }>;
  };
  school: {
    node: {
      name: string;
      slug: string;
    };
  };
}
```

## Routing

### URL Structure

- News: `/news/[slug]`
- Events: `/events/[slug]`
- Network:
  - Schools: `/network?school=[slug]`
  - Clubs: `/network/[slug]`

### Route Parameters

All dynamic routes use `slug` instead of `databaseId` for better SEO and readability:

```typescript
// Example route
export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch data using slug
  const { data } = await getClient().query({
    query: GET_POST_BY_ID,
    variables: { id: params.slug, idType: "SLUG" },
  });
}
```

## Data Fetching

### Hooks

Custom hooks in `useWordPress.ts` handle data fetching:

```typescript
// Fetch posts with pagination
const { posts, pageInfo, loading } = usePosts({ first: 10 });

// Fetch single post
const { post, loading } = usePost(slug);

// Fetch events
const { events, pageInfo } = useEvents({ first: 10 });

// Fetch schools and clubs
const { schools } = useSchools();
```

### Caching and Revalidation

- Pages use `revalidate = 3600` (1 hour) by default
- Apollo Client handles client-side caching
- Use `revalidateTag()` for on-demand revalidation

## Components

### Card Components

- `NewsCard`: Display news/blog posts
- `EventCard`: Display events with metadata
- `SchoolCard`: Display school and its clubs
- All cards use slugs for navigation

### Navigation

- Main navigation uses schools data with nested clubs
- Mobile menu shows schools and clubs in collapsible sections
- Search and filters use WordPress taxonomies

## GraphQL Queries

### Fragments

Common fragments for reusable fields:

```graphql
fragment MediaFields on MediaItem {
  sourceUrl
  altText
  title
}

fragment FeaturedImageFields on NodeWithFeaturedImage {
  featuredImage {
    node {
      ...MediaFields
    }
  }
}
```

### Main Queries

- `GET_POSTS`: Fetch paginated posts
- `GET_EVENTS`: Fetch events with metadata
- `GET_SCHOOLS`: Fetch schools with nested clubs
- All queries support cursor-based pagination

## Error Handling

```typescript
// Check for Apollo errors
export function isApolloError(error: any): boolean {
  return error?.networkError || error?.graphQLErrors?.length > 0;
}

// Get user-friendly error message
export function getErrorMessage(error: any): string {
  if (error?.networkError) {
    return "Network error occurred";
  }
  if (error?.graphQLErrors?.length) {
    return error.graphQLErrors[0].message;
  }
  return "An unknown error occurred";
}
```

## Best Practices

1. Always use TypeScript types from `@/types/wordpress`
2. Use slugs for routing instead of database IDs
3. Handle loading and error states
4. Implement proper SEO metadata
5. Use proper image optimization with next/image
6. Cache data appropriately
7. Handle network errors gracefully
