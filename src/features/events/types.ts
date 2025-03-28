import type { News } from "../news/types";

interface StakeholderData {
  name: string;
  logo?: {
    node: {
      sourceUrl: string;
    }
  }

}

interface OrganizerData extends StakeholderData {
  email: string;
}

interface SponsorData extends StakeholderData {
  website: string;
}

interface EventData {
  organizer: OrganizerData;
  sponsors?: Array<SponsorData>;
  eventTime: {
    eventStartTime: string;
    eventEndTime: string
  };
  location: string;
  capacity: number;
  delivery: 'virtual' | 'onsite';
  registerLink?: string;
}

interface Event extends News {
  eventData: EventData
}

export type { Event }