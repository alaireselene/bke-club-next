import type { WithContent, WithFeaturedImage, Node } from "@/types/wordpress";

type PartnerRegion = 'local' | 'global';
type PartnerType = 'academic' | 'business' | 'organization';

interface PartnerData {
  region: Array<PartnerRegion>
  type: Array<PartnerType>
  website: string
};

interface Partner extends Node, WithContent, WithFeaturedImage {
  partnerData: PartnerData
}


export type { Partner, PartnerRegion, PartnerType }