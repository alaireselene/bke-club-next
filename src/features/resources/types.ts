// Import the Resource type directly from the Directus definition
import type { Resource as DirectusResource } from "@/lib/directus";

// Re-export the Directus Resource type for use within this feature
export type Resource = DirectusResource;

export interface ResourceDialogProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export interface ResourceCardProps {
  resource: Resource;
  onOpen: (resource: Resource) => void;
} 