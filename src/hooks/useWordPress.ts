import { useQuery } from '@apollo/client';
import {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_EVENTS,
  GET_EVENT_BY_ID,
  GET_SCHOOLS,
  GET_CLUB_BY_ID,
  GET_NAVIGATION_DATA,
} from '@/lib/graphql/queries';
import type {
  Post,
  Event,
  Club,
  School,
  Connection,
  QueryResponse
} from '@/types/wordpress';

// Posts Hook
interface UsePostsOptions {
  first?: number;
  category?: string;
}

export function usePosts({ first = 10, category }: UsePostsOptions = {}) {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first, category }
  });

  const loadMore = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
        }
      });
    }
  };

  return {
    posts: data?.posts.nodes as Post[],
    pageInfo: data?.posts.pageInfo,
    loading,
    error,
    loadMore,
  };
}

// Single Post Hook
export function usePost(slug: string) {
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id: slug, idType: "SLUG" }
  });

  return {
    post: data?.post as Post,
    loading,
    error,
  };
}

// Events Hook
interface UseEventsOptions {
  first?: number;
}

export function useEvents({ first = 10 }: UseEventsOptions = {}) {
  const { data, loading, error, fetchMore } = useQuery(GET_EVENTS, {
    variables: { first }
  });

  const loadMore = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
        }
      });
    }
  };

  return {
    events: data?.posts.nodes as Event[],
    pageInfo: data?.posts.pageInfo,
    loading,
    error,
    loadMore,
  };
}

// Single Event Hook
export function useEvent(slug: string) {
  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: slug, idType: "SLUG" }
  });

  return {
    event: data?.post as Event,
    loading,
    error,
  };
}

// Schools Hook
export function useSchools() {
  const { data, loading, error } = useQuery(GET_SCHOOLS);

  return {
    schools: data?.schools.nodes as School[],
    loading,
    error,
  };
}

// Single Club Hook
export function useClub(slug: string) {
  const { data, loading, error } = useQuery(GET_CLUB_BY_ID, {
    variables: { id: slug, idType: "SLUG" }
  });

  return {
    club: data?.club as Club,
    loading,
    error,
  };
}

// Navigation Hook
interface NavigationData {
  schools: {
    nodes: Array<{
      id: string;
      databaseId: number;
      name: string;
      slug: string;
      clubs: {
        nodes: Array<{
          id: string;
          databaseId: number;
          title: string;
          slug: string;
          clubFields: {
            membersCount: number;
          };
        }>;
      };
    }>;
  };
  generalSettings: {
    title: string;
    description: string;
  };
}

export function useNavigationData() {
  const { data, loading, error } = useQuery<NavigationData>(GET_NAVIGATION_DATA);

  return {
    data,
    loading,
    error,
  };
}

// Error Utilities
export function isApolloError(error: any): boolean {
  return error?.networkError || error?.graphQLErrors?.length > 0;
}

export function getErrorMessage(error: any): string {
  if (error?.networkError) {
    return 'Network error occurred. Please check your connection.';
  }
  if (error?.graphQLErrors?.length) {
    return error.graphQLErrors[0].message;
  }
  return 'An unknown error occurred';
}