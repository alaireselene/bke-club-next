import { gql } from "@apollo/client";

export const EVENT_DATA_FIELDS = gql`
fragment EventDataFields on Post {
  eventData {
    organizer {
      name
      logo {
        node {
          sourceUrl
        }
      }
      email
    }
    sponsors {
      name
      logo {
        node {
          sourceUrl
        }
      }
      website
    }
    eventTime {
      eventStartTime
      eventEndTime
    }
    location
    capacity
    delivery
    registerLink
  }
}
`