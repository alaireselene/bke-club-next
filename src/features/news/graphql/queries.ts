import { gql } from '@apollo/client';
import { NEWS_FIELDS } from './fragments';

const GET_ALL_NEWS = gql`
  query GetAllNews($first: Int, $after: String, where: {categoryName: "news"}) {
    posts(first: $first, after: $after) {
      nodes {
        ...NewsFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${NEWS_FIELDS}
`;

const GET_NEWS_BY_SLUG = gql`
  query GetNewsBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...NewsFields
      content
      author {
        node {
          name
        }
      }
    }
  }
  ${NEWS_FIELDS}
`;

export { GET_ALL_NEWS, GET_NEWS_BY_SLUG }