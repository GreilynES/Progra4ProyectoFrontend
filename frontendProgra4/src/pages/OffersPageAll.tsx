import { useState } from "react";
import OfferCard from "../card/OfferCard";
import { router } from "../router/router";
import { useApplyToOffer, useMatchedOffers } from "../services/Offer/OfferHook";
import { useMyApplications } from "../services/Offer/OfferHook";

export default function OffersPage() {
  const candidate = JSON.parse(localStorage.getItem("candidate") || "{}");
  const { data: offers, isLoading } = useMatchedOffers(candidate.id);
  const { data: myApplications = [], isFetching } = useMyApplications(candidate.id);
  const applyMutation = useApplyToOffer(candidate.id);

  const hasAppliedToOffer = (offerId: number) => {
    return myApplications.some((app: any) => app.id === offerId);
  };

  const groupedOffers = offers?.reduce((acc: any, offer: any) => { //agrupar ofertas
    const existing = acc.find((o: any) => o.offerId === offer.offerId);
    if (existing) {
      existing.skillNames.push(offer.skillName);
    } else {
      acc.push({ ...offer, skillNames: [offer.skillName] });
    }
    return acc;
  }, []) || [];

  // Paginación
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(groupedOffers.length / pageSize);

  const paginatedOffers = groupedOffers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="offers-page-container">
      <h1 className="offers-title">Offers Matching Your Skills</h1>

      <div className="offers-container-button">
        <button
          className="offers-button"
          onClick={() => router.navigate({ to: "/offers/mine" })}
        >
          View My Applications
        </button>
      </div>

      {isLoading && <p>Loading offers...</p>}
      {isFetching && <p>Updating applications...</p>}

      {!isLoading && groupedOffers.length === 0 && (
        <p>No offers available.</p>
      )}

      <div className="offers-flex">
        {paginatedOffers.map((offer: any) => (
          <OfferCard
            key={offer.offerId}
            offer={offer}
            onApply={() => applyMutation.mutate(offer.offerId)}
            hasApplied={hasAppliedToOffer(offer.offerId)}
          />
        ))}
      </div>

      <div className="offer-page-pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className="pagination-button"
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}