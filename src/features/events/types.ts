// Import the Event type directly from the Directus definition
import type { Event as DirectusEvent } from "@/lib/directus";

// Re-export the Directus Event type for use within this feature
export type Event = DirectusEvent;

// Remove old WordPress-specific types (EventData, OrganizerData, SponsorData, EventTime, ImageNode, EventStatus)
// Note: The Directus 'Event' type has fields like:
// - title, description, categories (json), event_start, event_end, delivery, location, capacity
// - organizer_name, organizer_email, organizer_logo_url
// - sponsor (json), register_url
// Components using this type will need to be updated to use these flattened fields.
// The 'status' field in Directus Event is a generic string, not the specific EventStatus type.