export type FacilityStatus = 'working' | 'pending';

export interface FacilityData {
  location: string;
  status: FacilityStatus;
}

export interface Facility {
  title: string;
  content: string;
  facilityData: FacilityData;
}

export interface FacilityCardProps {
  facility: Facility;
  onOpen: (facility: Facility) => void;
}

export interface FacilityDialogProps {
  facility: Facility;
  isOpen: boolean;
  onClose: () => void;
} 