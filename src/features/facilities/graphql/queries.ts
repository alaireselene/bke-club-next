import { gql } from '@apollo/client';
import { FACILITY_FIELDS } from './fragments';

export const GET_FACILITIES = gql`
  query GetFacilities {
    facilities {
      nodes {
        ...FacilityFields
      }
    }
  }
  ${FACILITY_FIELDS}
`; 