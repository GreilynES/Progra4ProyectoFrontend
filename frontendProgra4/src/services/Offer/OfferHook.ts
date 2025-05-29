import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToOffer, getMatchedOffers, getMyApplications } from "./OfferService";


export const useMatchedOffers = (candidateId: number) => {
  return useQuery({
    queryKey: ["matchedOffers", candidateId],
    queryFn: () => getMatchedOffers(candidateId),
    enabled: !!candidateId,
  });
};


// export const useApplyToOffer = (candidateId:number, offerId:number) => {
//   return useQuery({
//     queryKey: ["hasApplied", candidateId, offerId],
//     queryFn: () => applyToOffer(candidateId, offerId),
//     enabled: !!candidateId && !!offerId,
//   });
// };

export const useApplyToOffer = (candidateId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: number) => applyToOffer(candidateId, offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications", candidateId] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Error al postularse";
      alert(message);
      queryClient.invalidateQueries({ queryKey: ["myApplications", candidateId] });
    },
  });
};

export const useMyApplications = (candidateId: number) => {
  return useQuery({
    queryKey: ["myApplications", candidateId],
    queryFn: async () => {
      const data = await getMyApplications(candidateId);
      console.log("My Applications response:", data);
      return data;
    },
    enabled: !!candidateId,
  });
};
