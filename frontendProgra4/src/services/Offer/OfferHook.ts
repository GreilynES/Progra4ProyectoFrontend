import { useQuery } from "@tanstack/react-query";
import { getMatchedOffers } from "./OfferService";


export const useMatchedOffers = (candidateId: number) => {
  return useQuery({
    queryKey: ["matchedOffers", candidateId],
    queryFn: () => getMatchedOffers(candidateId),
    enabled: !!candidateId,
  });
};
