import type { Offer } from "../Offers/Offer";

export interface Company {
  companyId: number;      
  name: string;            
  webSite: string;        
  email: string;           

  offers?: Offer[];
}