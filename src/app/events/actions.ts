"use server";

import { getClient } from "@/lib/apollo-client";
import { GET_ALL_EVENTS } from "@/features/events/graphql/queries";
import type { Event } from "@/features/events";

interface EventsResponse {
  events: Array<Event>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}

export async function loadMoreEvents(cursor: string): Promise<EventsResponse> {
  const { data } = await getClient().query({
    query: GET_ALL_EVENTS,
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