import api from "../../api/apiConfiguration";
import type { Offer } from "../../models/Offers/Offer";
import type { OfferSkill } from "../../models/Offers/OfferSkil";

export async function getMatchedOffers(candidateId: number): Promise<OfferSkill[]> {
  const response = await api.get(`/OfferSkill/match/${candidateId}`);
  return response.data;
}


export async function applyToOffer(candidateId: number, offerId: number): Promise<void> {
  await api.post("/CandidateOffer", { candidateId, offerId }); 
}

export async function getMyApplications(candidateId: number): Promise<Offer[]> {
  const response = await api.get(`/CandidateOffer/${candidateId}`);
  return response.data
    // .filter((co: any) => co.candidate?.id === candidateId)
    // .map((co: any) => co.offer); // nos quedamos solo con la oferta
}