export interface Resource {
  title: string;
  content: string;
}

export interface ResourceDialogProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export interface ResourceCardProps {
  resource: Resource;
  onOpen: (resource: Resource) => void;
} 