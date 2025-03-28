import type { News } from "../news/types";

interface ImageNode {
  sourceUrl: string;
  altText?: string;
}

interface StakeholderData {
  name: string;
  logo?: {
    node?: ImageNode;
  }
}

interface OrganizerData extends StakeholderData {
  email: string;
}

interface SponsorData extends StakeholderData {
  website: string;
}

interface EventTime {
  eventStartTime?: string | null;
  eventEndTime?: string | null;
}

type EventStatus = 'draft' | 'published' | 'cancelled' | 'postponed';

interface EventData {
  organizer?: OrganizerData;
  sponsors?: Array<SponsorData>;
  eventTime?: EventTime;
  location?: string;
  capacity?: number;
  delivery?: 'virtual' | 'onsite';
  registerLink?: string;
  status?: EventStatus;
}

interface Event extends News {
  eventData?: EventData;
}

export type {
  Event,
  EventData,
  EventTime,
  OrganizerData,
  SponsorData,
  EventStatus,
  ImageNode
}