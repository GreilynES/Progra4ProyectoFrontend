import OfferCard from "../card/OfferCard";
import { router } from "../router/router";
import { useApplyToOffer, useMatchedOffers } from "../services/Offer/OfferHook";
import { useMyApplications } from "../services/Offer/OfferHook";
export default function OffersPage() {
  const candidate = JSON.parse(localStorage.getItem("candidate") || "{}");
  const { data: offers, isLoading } = useMatchedOffers(candidate.id);
  // Cargar las postulaciones del candidato
  const { data: myApplications = [], isFetching } = useMyApplications(candidate.id);
  const applyMutation = useApplyToOffer(candidate.id);
 // Función para verificar si ya se ha postulado a una oferta


    const hasAppliedToOffer = (offerId: number) => {
      return myApplications.some((app: any) => app.id === offerId);
    };
    
// Agrupar ofertas por ID y combinar nombres de habilidades
  const groupedOffers = offers?.reduce((acc: any, offer: any) => {
    const existing = acc.find((o: any) => o.offerId === offer.offerId);
    if (existing) {
      existing.skillNames.push(offer.skillName);
    } else {
      acc.push({ ...offer, skillNames: [offer.skillName] });
    }
    return acc;
  }, []) || [];
// Mostrar mensaje de actualización mientras se obtienen las postulaciones
  console.log("Ofertas agrupadas:", groupedOffers);
  console.log("Mis postulaciones:", myApplications);
  {isFetching && <p>Actualizando postulaciones...</p>}

  return (
    <div className="offers-page-container" >
       <button className="offers-button" 
       onClick={() => router.navigate({ to: '/offers/mine' })}> Ver mis postulaciones</button>
      <h2 className="offers-title" >Ofertas que coinciden con tus habilidades</h2>

      {isLoading && <p className="offers-loading">Cargando...</p>}

      {!isLoading && groupedOffers.length === 0 && (
        <p className="offers-no-results">No hay ofertas disponibles.</p>
      )}
     
      <div className="offers-flex">
        {groupedOffers.map((offer: any) => (
          <OfferCard 
            key={offer.offerId}
            offer={offer}
            onApply={() => applyMutation.mutate(offer.offerId)}
            hasApplied={hasAppliedToOffer(offer.offerId)}
          />
        ))}
      </div>
    </div>
  );
}