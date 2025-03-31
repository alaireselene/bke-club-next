import { gql } from '@apollo/client';

export const RESOURCE_FIELDS = gql`
  fragment ResourceFields on Resource {
    title
    content
  }
`; 