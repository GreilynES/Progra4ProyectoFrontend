import { useMutation, useQuery } from "@tanstack/react-query";
import { applyToOffer, getMatchedOffers } from "./OfferService";


export const useMatchedOffers = (candidateId: number) => {
  return useQuery({
    queryKey: ["matchedOffers", candidateId],
    queryFn: () => getMatchedOffers(candidateId),
    enabled: !!candidateId,
  });
};

export const useApplyToOffer = () => {
  return useMutation({
    mutationFn: ({ candidateId, offerId }: { candidateId: number; offerId: number }) =>
      applyToOffer(candidateId, offerId),
  });
};