export type Client = {
  [index: string]: number | string | null | undefined;
  clientId: number;
  clientName: string;
  clientContactPhone: number;
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
