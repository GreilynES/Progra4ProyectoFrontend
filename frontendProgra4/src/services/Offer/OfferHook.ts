// ./services/Offer/OfferHook.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToOffer, getMatchedOffers, getMyApplications } from "./OfferService";

// Ofertas que coinciden con habilidades del candidato
export const useMatchedOffers = (candidateId?: number) => {
  return useQuery({
    queryKey: ["matchedOffers", candidateId],
    queryFn: () => getMatchedOffers(candidateId!),
    enabled: !!candidateId,
  });
};

// Postularse a una oferta
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

// Obtener postulaciones hechas por el candidato
export const useMyApplications = (candidateId?: number) => {
  return useQuery({
    queryKey: ["myApplications", candidateId],
    queryFn: () => getMyApplications(candidateId!),
    enabled: !!candidateId,
  });
};
