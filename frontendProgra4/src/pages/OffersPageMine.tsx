import OfferCardMine from "../card/OfferCardMine";
import { router } from "../router/router";
import { useRemoveCandidateOffer } from "../services/Candidate/CandidateHook";
import { useMyApplications } from "../services/Offer/OfferHook";

function OffersPageMine() {
  const candidate = JSON.parse(localStorage.getItem("candidate") || "{}");
  const { data: applications, isLoading } = useMyApplications(candidate.id);
  const removeCandidateOffer = useRemoveCandidateOffer(candidate.id);
  console.log("Mis postulaciones:", applications);
  return (
    <div className="offers-page">
      <button
        onClick={() => router.navigate({ to: "/offers" })}
        className="offers-button"
      >
        Ver todas las ofertas
      </button>

      <h2 className="offers-title">Mis Postulaciones</h2>

      {isLoading && <p>Cargando postulaciones...</p>}

      {!isLoading && (!applications || applications.length === 0) && (
        <p>No hay postulaciones registradas.</p>
      )}

      <div className="offers-grid">
     {applications?.map((offer) => (
    <div key={offer.id} style={{ position: "relative" }}>
      <OfferCardMine offer={offer} />
    <button
      className="cancel-button"
      onClick={() => removeCandidateOffer.mutate({ offerId: offer.id })}
      disabled={removeCandidateOffer.isPending}>
      {removeCandidateOffer.isPending ? "Eliminando..." : "Cancelar postulación"}
    </button>
    </div>
  ))}
      </div>
    </div>
  );
}

export default OffersPageMine;