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

// export const OfferSkillInitialState: OfferSkill = {
//   offerId: 0,
//   offerName: "",
//   offerDescription: "",
//   companyName: "",
//   skillId: 0,
//   skillName: "",
// }