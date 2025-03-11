export type School = {
  id: number;
  name: string;
  slug: string;
};

export type Club = {
  id: number;
  name: string;
  slug: string;
  schoolId: number | null;
};