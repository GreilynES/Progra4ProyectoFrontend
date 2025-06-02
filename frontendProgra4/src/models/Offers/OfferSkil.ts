import type { Skill } from "../Skill/Skill";

export interface OfferSkill {
  offerId: number;
  offerName: string;
  offerDescription: string;
  companyName: string;
  skillId: number;
  skillName: string;
  skill:Skill;
}
