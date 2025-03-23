import type { Node, WithContent, WithFeaturedImage, WithDate, WithAuthor } from "@/types/wordpress";

export interface News extends Node, WithContent, WithFeaturedImage, WithDate, WithAuthor {
  excerpt?: string;
  categories: {
    nodes: Array<Node>;
  };
}