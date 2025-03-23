import type { News } from "../../types";

type FeaturedNewsProps = {
  posts: News[];
};

type CategoryType =
  | "scholarship"
  | "research-news"
  | "achievement"
  | "announcement";

export type { FeaturedNewsProps, CategoryType }