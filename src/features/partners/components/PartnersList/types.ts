import { MapPin, Building2 } from "lucide-react";
import type { Partner, PartnerRegion, PartnerType } from "../../types";

interface RegionFilter {
  id: PartnerRegion;
  name: string;
  icon: typeof MapPin;
}

interface TypeFilter {
  id: PartnerType;
  name: string;
  icon: typeof Building2;
}

interface PartnersListProps {
  partners: Array<Partner>;
}

export type { RegionFilter, TypeFilter, PartnersListProps }