import type { Node, WithContent, WithFeaturedImage, WithDate, WithAuthor, WithTitle } from "@/types/wordpress";

export interface News extends Node, WithTitle, WithContent, WithFeaturedImage, WithDate, WithAuthor {
  excerpt?: string;
  categories: {
    nodes: Array<Node>;
  };
}