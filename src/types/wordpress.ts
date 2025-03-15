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
    organizer: OrganizerData;
    sponsors?: SponsorData[];
    eventTime: {
      eventStartTime: string;
      eventEndTime: string
    };
    location: string;
    capacity: number;
    delivery: 'virtual' | 'onsite';
    registerLink?: string;
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

export type PartnerRegion = 'local' | 'global';
export type PartnerType = 'academic' | 'business' | 'organization';

export interface Partner extends WithContent, WithFeaturedImage {
  partnerData: {
    region: PartnerRegion[];
    type: PartnerType[];
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
export interface OrganizerData {
  name: string;
  email: string;
  logo?: {
    node: {
      sourceUrl: string;
    }
  };
}

export interface SponsorData {
  name: string;
  website: string;
  logo?: {
    node: {
      sourceUrl: string;
    };
  };
}