import type { Node, WithFeaturedImage, WithContent, WithTitle } from "@/types/wordpress";

interface School extends Node, WithFeaturedImage {
  name: string;
  description?: string;
  clubs?: {
    nodes: Club[];
  };
}

interface Club extends Node, WithTitle, WithContent, WithFeaturedImage {
  clubData: {
    establishedYear: string;
    membersCount: number;
    president: {
      presidentName: string;
      presidentEmail: string;
    };
    advisors: Array<{
      advisorName: string;
      advisorEmail: string;
    }>;
  };
  school?: {
    node: School;
  };
}

export type { School, Club }