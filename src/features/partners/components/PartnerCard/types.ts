import type { AcademicPartner, BusinessPartner } from "../../types";

export type PartnerCardProps = {
  partner: AcademicPartner | BusinessPartner;
  className?: string;
};