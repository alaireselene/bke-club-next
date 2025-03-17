"use server";

import { getClient } from "@/lib/apollo-client";
import { GET_EVENTS } from "@/lib/graphql/queries";
import type { Event } from "@/types/wordpress";

interface EventsResponse {
  events: Event[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}

export async function loadMoreEvents(cursor: string): Promise<EventsResponse> {
  const { data } = await getClient().query({
    query: GET_EVENTS,
    variables: {
      first: 12,
      after: cursor,
    },
  });

  return {
    events: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}