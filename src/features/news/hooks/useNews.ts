import { useQuery } from '@apollo/client';
import { GET_ALL_NEWS } from '../graphql/queries';
import type { News } from '../types';

// Mul
export function useNews({ first = 10 } = {}) {
  const { data, loading, error } = useQuery(GET_ALL_NEWS, {
    variables: { first }
  });

  return {
    news: data?.posts.nodes as Array<News>,
    loading,
    error
  };
}