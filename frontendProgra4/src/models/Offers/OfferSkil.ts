export interface OfferSkill {
  offerId: number;
  offerName: string;
  offerDescription: string;
  companyName: string;
  skillId: number;
  skillName: string;
}

export const OfferSkillInitialState: OfferSkill = {
  offerId: 0,
  offerName: "",
  offerDescription: "",
  companyName: "",
  skillId: 0,
  skillName: "",
}