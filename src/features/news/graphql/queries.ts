import { gql } from '@apollo/client';
import { NEWS_FIELDS } from './fragments';
import { PAGE_INFO_FIELDS, CONTENT_NODE_FIELDS } from '@/lib/graphql/fragments';

const GET_ALL_NEWS = gql`
  query GetAllNews($first: Int, $after: String) {
    posts(first: $first, after: $after, where: {
      categoryName: "news"
      orderby: { field: DATE, order: DESC }
      }) {
      nodes {
        categories {
          nodes {
            databaseId
            name
          }
        }
        ...ContentNodeFields
        ...NewsFields
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${CONTENT_NODE_FIELDS}
  ${NEWS_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

const GET_NEWS_BY_SLUG = gql`
  query GetNewsBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      categories {
        nodes {
          databaseId
          name
        }
      }
      ...ContentNodeFields
      ...NewsFields
      content
    }
  }
  ${NEWS_FIELDS}
  ${CONTENT_NODE_FIELDS}
`;

const GET_CATEGORIES = gql`
 query GetCategories {
  categories {
    nodes {
      slug
      name
      ancestors {
        nodes {
          slug
        }
      }
    }
  }
 }
`

export { GET_ALL_NEWS, GET_NEWS_BY_SLUG, GET_CATEGORIES }