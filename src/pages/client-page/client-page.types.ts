export type Client = {
  clientId: number;
  clientName: string;
  clientContactPhone: string;
  clientAge?: number | null;
  clientDetails?: string | null;
}

export type ClientListing = {
  estateId: number;
  district: string;
  neighborhood: string; 
  estatePrice: number;
  currencyTypeId: number;
}
