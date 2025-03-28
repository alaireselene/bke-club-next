import { gql } from '@apollo/client';

// Fragment cho DatabaseIdentifier
export const DATABASE_IDENTIFIER_FIELDS = gql`
  fragment DatabaseIdentifierFields on DatabaseIdentifier {
    databaseId
  }
`;

// Fragment cho PageInfo
export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on WPPageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

// Fragment cho MediaItem
export const MEDIA_ITEM_FIELDS = gql`
  fragment MediaItemFields on MediaItem {
    ...DatabaseIdentifierFields
    sourceUrl
    altText
    title
  }
  ${DATABASE_IDENTIFIER_FIELDS}
`;

// Fragment cho Featured Image
export const FEATURED_IMAGE_FIELDS = gql`
  fragment FeaturedImageFields on NodeWithFeaturedImage {
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
  }
  ${MEDIA_ITEM_FIELDS}
`;

// Fragment cho ContentNode
export const CONTENT_NODE_FIELDS = gql`
  fragment ContentNodeFields on ContentNode {
    ...DatabaseIdentifierFields
    slug
    date
    modified
  }
  ${DATABASE_IDENTIFIER_FIELDS}
`;

// Fragment cho NodeWithTitle
export const TITLE_FIELDS = gql`
  fragment TitleFields on NodeWithTitle {
    title
  }
`;

// Fragment cho Content
export const CONTENT_FIELDS = gql`
  fragment ContentFields on NodeWithContentEditor {
    content
  }
`;

// Fragment cho Excerpt
export const EXCERPT_FIELDS = gql`
  fragment ExcerptFields on NodeWithExcerpt {
    excerpt
  }
`;

// Fragment cho Author
export const AUTHOR_FIELDS = gql`
  fragment AuthorFields on NodeWithAuthor {
    author {
      node {
        name
        description
      }
    }
  }
`;

