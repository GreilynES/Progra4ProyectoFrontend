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
      {/* Botón para volver a ver todas las ofertas */}
      <button
        onClick={() => router.navigate({ to: "/offers" })}
        className="offers-button"
      >
        View All Offers
      </button>

      {/* Título de la sección */}
      <h2 className="offers-title">My Applications</h2>

      {/* Mostrar cargando mientras se obtienen las postulaciones */}
      {isLoading && <p>Loading applications...</p>}

      {/* Mostrar mensaje si no hay postulaciones */}
      {!isLoading && (!applications || applications.length === 0) && (
        <p>No applications found.</p>
      )}

      {/* Listado de postulaciones */}
      <div className="offers-grid">
        {applications?.map((offer) => (
          <div key={offer.id} style={{ position: "relative" }}>
            <OfferCardMine offer={offer} />
            <button
              className="cancel-button"
              onClick={() => removeCandidateOffer.mutate({ offerId: offer.id })}
              disabled={removeCandidateOffer.isPending}
            >
              {removeCandidateOffer.isPending ? "Removing..." : "Cancel Application"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPageMine;