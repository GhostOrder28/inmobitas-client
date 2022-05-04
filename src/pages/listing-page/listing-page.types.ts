import { Client } from "../../components/owner-detail/owner-detail.types";
import { Nullable } from "../../utils/utility-types";

export type Presets = {
  contractTypes: ContractPreset[];
  currencyTypes: CurrencyPreset[];
  estateTypes: EstatePreset[];
}

export type CurrencyPreset = {
  [index: string]: number | string;
  currencyTypeId: number;
  currencyName: string;
  currencySymbol: string;
}

export type ContractPreset = {
  [index: string]: number | string;
  contractTypeId: number;
  contractName: string;
}

export type EstatePreset = {
  [index: string]: number | string;
  estateTypeId: number;
  estateName: string;
}

export type Listing = {
  [prop: string]: string | number | null | boolean;
} & Client & Contract & Estate & Features & House & Apartment & OwnerPreferences;

export type Contract = {
  [index: string]: number | boolean;
  contractId: number;
  contractTypeId: number;
  currencyTypeId: number;
  estatePrice: number;
  fee: number;
  signedDate: number;
  startDate: number;
  endDate: number;
  utilitiesIncluded: boolean;
  isExclusive: boolean;
  isPercentage: boolean;
}

export type Estate = {
  estateId: number;
  estateTypeId: number;
  district: string;
  neighborhood: string;
  addressDetails: string;
  totalArea: number;
  builtArea: number;
  estateDetails: string;
}

export type Features = {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfGarages: number;
  numberOfKitchens: number;
  haveNaturalGas: boolean;
}

export type House = {
  numberOfFloors: number;
}

export type Apartment = {
  floorLocation: number;
}

export type OwnerPreferences = {
  childrenAllowed: boolean;
  petsAllowed: boolean;
  preferenceDetails: string;
  ownerPreferencesDetails: string;
}

