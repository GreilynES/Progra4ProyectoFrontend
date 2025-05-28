import type { Offer } from "../Offers/Offer";

export interface Company {
  companyId: number;       // ID interno de la empresa
  name: string;            // Nombre de la empresa
  webSite: string;         // Sitio web
  email: string;           // Correo electrónico

  // Relación con ofertas (opcional)
  offers?: Offer[];
}