export type ListingItem = {
  [index: string]: string | number | undefined;
  clientId: number;
  estateId: number;
  district: string,
  neighborhood: string; 
  totalArea?: number;
  builtArea?: number;
}
