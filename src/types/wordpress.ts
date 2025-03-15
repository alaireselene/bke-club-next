// Base Interfaces
interface Node {
  id: string;          // GraphQL node ID (base64 encoded)
  databaseId: number;  // WordPress post/term ID
  slug: string;
}

export interface MediaItem extends Node {
  sourceUrl: string;
  altText?: string;
  title?: string;
}

export interface FeaturedImage {
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

// Main Types
export interface Post extends WithContent, WithFeaturedImage, WithDate, WithAuthor {
  excerpt?: string;
  categories: {
    nodes: Array<{
      databaseId: number;
      name: string;
      slug: string;
      parent?: {
        node: {
          name: string;
          slug: string;
        }
      }
    }>;
  };
}

export interface Event extends Post {
  eventData: {
    eventTime: {
      eventStartTime: string;
      eventEndTime: string
    };
    location: string;
    capacity: number;
    delivery: 'virtual' | 'onsite';
    registerUrl?: string;
    organizer: {
      name: string;
      email: string;
      logo?: {
        sourceUrl: string;
      };
    };
    sponsors?: Array<{
      name: string;
      website: string;
      logo?: {
        sourceUrl: string;
      };
    }>;
  };
}

export interface School extends Node, WithFeaturedImage {
  name: string;
  description?: string;
  clubs?: {
    nodes: Club[];
  };
}

export interface Club extends WithContent, WithFeaturedImage {
  clubData: {
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
  school?: {
    node: School;
  };
}

export interface Partner extends WithContent, WithFeaturedImage {
  partnerData: {
    region: 'local' | 'global';
    type: 'academic' | 'business' | 'organization';
    website: string;
  };
}

// GraphQL Response Types
export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface Connection<T> {
  pageInfo: PageInfo;
  nodes: T[];
}

export interface QueryResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}

// Common Field Interfaces
export interface OrganizerFields {
  name: string;
  email: string;
  logo?: {
    sourceUrl: string;
  };
}

export interface SponsorFields {
  name: string;
  website: string;
  logo?: {
    sourceUrl: string;
  };
}