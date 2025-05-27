import api from "../../api/apiConfiguration";
import type { OfferSkill } from "../../models/Offers/OfferSkil";

export async function getMatchedOffers(candidateId: number): Promise<OfferSkill[]> {
  const response = await api.get(`/OfferSkill/match/${candidateId}`);
  return response.data;
}

export async function applyToOffer(candidateId: number, offerId: number): Promise<void> {
  await api.post("/CandidateOffer", { candidateId, offerId }); 
}
