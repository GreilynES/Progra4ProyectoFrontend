import { useEffect, useState } from "react";
import { useMatchedOffers } from "../services/Offer/OfferHook";
import type { OfferSkill } from "../models/Offers/OfferSkil";

type GroupedOffer = {
  offerId: number;
  offerName: string;
  offerDescription: string;
  companyName: string;
  skillNames: string[];
};

function OffersPage() {
  const [candidateId, setCandidateId] = useState<number | null>(null);

  useEffect(() => {
    const candidateString = localStorage.getItem("candidate");
    if (candidateString) {
      const candidate = JSON.parse(candidateString);
      setCandidateId(candidate.id);
    }
  }, []);

  const { data: rawOffers, isLoading, error } = useMatchedOffers(candidateId ?? 0);

  const groupedOffers: GroupedOffer[] = [];

  rawOffers?.forEach((item: OfferSkill) => {
    const existing = groupedOffers.find(o => o.offerId === item.offerId);
    if (existing) {
      if (!existing.skillNames.includes(item.skillName)) {
        existing.skillNames.push(item.skillName);
      }
    } else {
      groupedOffers.push({
        offerId: item.offerId,
        offerName: item.offerName,
        offerDescription: item.offerDescription,
        companyName: item.companyName,
        skillNames: [item.skillName],
      });
    }
  });

  if (isLoading) return <p>Cargando ofertas...</p>;
  if (error) return <p>Error al cargar ofertas.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Ofertas que coinciden con tus habilidades</h2>
      {groupedOffers.length === 0 && <p>No hay ofertas disponibles.</p>}
      <div className="grid gap-4">
        {groupedOffers.map((offer) => (
          <div key={offer.offerId} className="border rounded-xl p-4 bg-black text-white space-y-2">
            <p><strong>Nombre Empresa:</strong> {offer.companyName}</p>
            <p><strong>Puesto:</strong> {offer.offerName}</p>
            <p><strong>Descripción:</strong> {offer.offerDescription}</p>
            <p><strong>Habilidades:</strong></p>
            <div className="flex flex-wrap gap-2">
              {offer.skillNames.map((skill, i) => (
                <span key={i} className="px-3 py-1 border rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
