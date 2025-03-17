"use server";

import { getClient } from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/graphql/queries";

export async function loadMorePosts(cursor: string) {
  const { data } = await getClient().query({
    query: GET_POSTS,
    variables: {
      first: 12,
      after: cursor,
    },
  });

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}