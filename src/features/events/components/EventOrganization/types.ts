interface EventOrganizationProps {
  host?: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  sponsors?: Array<{
    name: string;
    logoUrl?: string;
  }>;
}

export type { EventOrganizationProps }