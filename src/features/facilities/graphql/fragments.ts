import { gql } from '@apollo/client';

export const FACILITY_FIELDS = gql`
  fragment FacilityFields on Facility {
    title
    content
    facilityData {
      location
      status
    }
  }
`; 