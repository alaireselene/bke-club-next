// Base Interfaces
interface Node {
  databaseId: number;
  name?: string;
  slug: string;
  parents?: Array<Node>;
}

interface MediaItem {
  sourceUrl: string;
  altText?: string;
  title?: string;
}

interface WithTitle extends Node {
  title: string;
}

interface WithContent extends Node {
  content: string;
}

interface WithExcerpt extends Node {
  excerpt: string
}

interface WithFeaturedImage extends Node {
  featuredImage?: {
    node: MediaItem
  }
}

interface WithDate {
  date: string;
  modified: string;
}

interface WithAuthor extends Node {
  author?: {
    node: {
      name: string;
      description?: string;
    };
  };
}

// GraphQL Response Types
interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

interface Connection<T> {
  pageInfo: PageInfo;
  nodes: T[];
}

interface QueryResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}

export type {
  Node, WithTitle, WithContent, WithFeaturedImage, WithDate, WithAuthor, WithExcerpt, Connection, QueryResponse
}