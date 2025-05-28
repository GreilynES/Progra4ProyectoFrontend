import type { Company } from "../Company/Company";
import type { OfferSkill } from "./OfferSkil";

export interface Offer {
  offerId: number;          // ID interno de la oferta
  companyName: number;        // Clave foránea a Company
  offerName: string;              // Título del puesto
  offerDescription: string;      // Descripción del trabajo

  // Relaciones (opcionalmente presentes)
  company?: Company;                        
  offerSkills?: OfferSkill[];
//   candidateOffers?: CandidateOffer[];
}