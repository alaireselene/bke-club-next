import { gql } from '@apollo/client';
import { RESOURCE_FIELDS } from './fragments';

export const GET_RESOURCES = gql`
  query GetResources {
    resources {
      nodes {
        ...ResourceFields
      }
    }
  }
  ${RESOURCE_FIELDS}
`; 