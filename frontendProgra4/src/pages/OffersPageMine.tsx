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
      <h1 className="offers-title">My Applications</h1>

      <div  className="offers-container-button">
       <button 
        onClick={() => router.navigate({ to: "/offers" })}
        className="offers-button"
      >
        View All Offers
      </button>
      </div>

      {isLoading && <p>Loading applications...</p>}

      {!isLoading && (!applications || applications.length === 0) && (
        <p>No applications found.</p>
      )}

      <div className="offers-flex">
        {applications?.map((offer) => (
          <div key={offer.id} style={{ position: "relative" }}>
            <OfferCardMine
              offer={offer}
              onCancel={() => removeCandidateOffer.mutate({ offerId: offer.id })}
              isLoading={removeCandidateOffer.isPending}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OffersPageMine;