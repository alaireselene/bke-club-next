import type { News } from "../../types";

interface Category {
  slug: string;
  name: string;
}

interface NewsFilterProps {
  categories: Array<Category>;
  news: Array<News>;
  hasMore: boolean;
  endCursor: string;
}

export type { NewsFilterProps }
