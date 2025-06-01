import type { Company } from "../Company/Company";
import type { OfferSkill } from "./OfferSkil";
export interface Offer {
  id: number;
  idCompany: number;
  name: string;
  description: string;

  company?: Company;
  offerSkills?: OfferSkill[];
}