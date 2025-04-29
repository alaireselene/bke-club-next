import { createDirectus, rest } from '@directus/sdk';
import { UUID } from 'crypto';

// Base interface for common fields across collections
interface BaseEntity {
  id: number;
  status?: string;
  user_created?: string;
  date_created?: 'datetime';
  user_updated?: string;
  date_updated?: 'datetime';
}

// Interfaces for each collection, extending BaseEntity
export interface School extends BaseEntity {
  name: string;
  slug: string;
}

export interface Club extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  established_date: 'datetime';
  school_id: number | School;
  members_count: number;
  president_name: string;
  president_email?: string;
  advisors: 'json';
}

export interface Post extends BaseEntity {
  title: string;
  content: string;
  categories: 'json';
  preview_image?: UUID;
}

export interface Event extends BaseEntity {
  title: string;
  categories: 'json';
  description: string;
  event_start: 'datetime';
  event_end: 'datetime';
  delivery: string;
  location: string;
  capacity: number;
  organizer_name: string;
  organizer_email?: string;
  organizer_logo_url?: string;
  sponsor?: 'json';
  register_url?: string;
  featured_image?: UUID;
}

export interface Resource extends BaseEntity {
  title: string;
  description: string;
  attachment?: UUID;
}

export interface Partner extends BaseEntity {
  name: string;
  region: string;
  type: string;
  logo?: UUID;
  website_url?: string;
}

export interface Facility extends BaseEntity {
  name: string;
  location: string;
  description?: string;
}

// Define the Directus schema
export interface MySchema {
  school: School[];
  club: Club[];
  post: Post[];
  event: Event[];
  resource: Resource[];
  partner: Partner[];
  facility: Facility[];
}

// Create and export the Directus client with rest() composable
export const directus = createDirectus<MySchema>(process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000").with(rest({
  onRequest: (options) => ({ ...options, cache: 'no-store' }),
}));