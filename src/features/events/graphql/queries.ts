// Event is just an extended type of News
import { gql } from '@apollo/client';
import { NEWS_FIELDS } from '../../news/graphql/fragments';
import { EVENT_DATA_FIELDS } from './fragments';
import { PAGE_INFO_FIELDS } from '@/lib/graphql/fragments';

const GET_ALL_EVENTS = gql`
query GetAllEvents($first: Int, $after: String) {
  posts(first: $first, after: $after, where: {
    categoryName: "event"
    orderby: { field: DATE, order: DESC }
    }) {
    nodes {
      ...NewsFields
      ...EventDataFields
    }
    pageInfo {
      ...PageInfoFields
    }
  }
}
${NEWS_FIELDS}
${EVENT_DATA_FIELDS}
${PAGE_INFO_FIELDS}
`

// Add the event by slug query following the pattern of news
const GET_EVENT_BY_SLUG = gql`
  query GetEventBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...NewsFields
      ...EventDataFields
      content
      author {
        node {
          name
        }
      }
    }
  }
  ${NEWS_FIELDS}
  ${EVENT_DATA_FIELDS}
`;

export { GET_ALL_EVENTS, GET_EVENT_BY_SLUG }