import OfferCard from "../card/OfferCard";
import { router } from "../router/router";
import { useApplyToOffer, useMatchedOffers } from "../services/Offer/OfferHook";

export default function OffersPage() {
  const candidate = JSON.parse(localStorage.getItem("candidate") || "{}");
  const { data: offers, isLoading } = useMatchedOffers(candidate.id);
  const { mutate: apply } = useApplyToOffer();

  const handleApply = (offerId: number) => {
    apply({ candidateId: candidate.id, offerId }, {
      onSuccess: () => alert("¡Postulación exitosa!"),
    });
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