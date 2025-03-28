import type { School } from "../../types";

interface SearchFilterProps {
  schools: Array<School>;
  onSearch: (query: string) => void;
  onSchoolChange: (schoolId: string) => void;
  className?: string;
}

export type { SearchFilterProps }