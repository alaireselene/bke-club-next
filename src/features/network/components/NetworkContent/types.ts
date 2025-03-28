import type { School } from "../../types";

interface NetworkContentProps {
  schools: Array<School>;
  initialSchoolFilter?: string;
}

export type { NetworkContentProps }