// Base Interfaces
interface Node {
  databaseId: number;
  name?: string;
  slug: string;
  parents?: Array<Node>;
}

interface MediaItem extends Node {
  sourceUrl: string;
  altText?: string;
  title?: string;
}

interface FeaturedImage {
  node: MediaItem;
}

interface WithTitle extends Node {
  title: string;
}

interface WithContent extends WithTitle {
  content: string;
}

interface WithFeaturedImage {
  featuredImage?: FeaturedImage;
}

interface WithDate {
  date: string;
  modified: string;
}

interface WithAuthor {
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

export type { Node, WithTitle, WithContent, WithFeaturedImage, WithDate, WithAuthor }