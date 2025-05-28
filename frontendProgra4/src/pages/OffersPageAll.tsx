import { useQueryClient } from "@tanstack/react-query";
import OfferCard from "../card/OfferCard";
import { router } from "../router/router";
import { useMatchedOffers } from "../services/Offer/OfferHook";
import { applyToOffer } from "../services/Offer/OfferService";

export default function OffersPage() {
  const candidate = JSON.parse(localStorage.getItem("candidate") || "{}");
  const { data: offers, isLoading } = useMatchedOffers(candidate.id);
  const queryClient = useQueryClient();

  const handleApply = async (offerId: number) => {
    try {
      await applyToOffer(candidate.id, offerId);
      alert("¡Postulación exitosa!");
      queryClient.invalidateQueries({
        queryKey: ["myApplications", candidate.id],

      });
    } catch (error) {
      alert("Error al postularse.");
      console.error(error);
    }
    console.log(offerId, candidate.id);
  };
  

  const groupedOffers = offers?.reduce((acc: any, offer: any) => {
    const existing = acc.find((o: any) => o.offerId === offer.offerId);
    if (existing) {
      existing.skillNames.push(offer.skillName);
    } else {
      acc.push({ ...offer, skillNames: [offer.skillName] });
    }
    return acc;
  }, []) || [];

  return (
    <div >
       <button onClick={() => router.navigate({ to: '/offers/mine' })}> Ver mis postilaciones</button>
      <h2 >Ofertas que coinciden con tus habilidades</h2>

      {isLoading && <p>Cargando...</p>}

      {!isLoading && groupedOffers.length === 0 && (
        <p>No hay ofertas disponibles.</p>
      )}
     
      <div className="grid gap-4">
        {groupedOffers.map((offer: any) => (
          <OfferCard 
            key={offer.offerId}
            offer={offer}
            onApply={() => handleApply(offer.offerId)}
          />
        ))}
      </div>
    </div>
  );
}