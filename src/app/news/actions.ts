"use server";

import { getClient } from "@/lib/apollo-client";
import { GET_ALL_NEWS } from "@/features/news/graphql/queries";

export async function loadMorePosts() {
  const { data } = await getClient().query({
    query: GET_ALL_NEWS,
  });

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}