import type { WithContent, WithFeaturedImage } from "@/types/wordpress";

interface BasePartner {
  logo: string;
  name: string;
  description: string;
  website: string;
};

interface AcademicPartner extends BasePartner {
  type: "academic";
  details: {
    region: string;
  };
};

type BusinessPartner = BasePartner & {
  type: "business";
  details: {
    industry: string;
    cooperationType: string;
    internshipInfo?: string;
  };
};

type PartnerRegion = 'local' | 'global';
type PartnerType = 'academic' | 'business' | 'organization';

interface Partner extends WithContent, WithFeaturedImage {
  partnerData: {
    region: PartnerRegion[];
    type: PartnerType[];
    website: string;
  };
}


export type { AcademicPartner, BusinessPartner, Partner }