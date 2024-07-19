import { PartialBy } from "../../utils/utility-types";
import { Client } from "../client-page/client-page.types";
import { Nullable } from "../../utils/utility-types";

export type Presets = {
  contractTypes: ContractPreset[];
  // currencyTypes: CurrencyPreset[];
  estateTypes: EstatePreset[];
}

// export type CurrencyPreset = {
//   currencyTypeId: number;
//   currencyName: string;
//   currencySymbol: string;
// }

export type ContractPreset = {
  // [index: string]: number | string;
  contractTypeId: number;
  contractName: string;
}

export type EstatePreset = {
  // [index: string]: number | string;
  estateTypeId: number;
  estateName: string;
}

export type Contract = {
  // [index: string]: number | boolean;
  contractId: number;
  // estatePrice: number;
  // fee: number;
  // signedDate: number;
  // startDate: number;
  // endDate: number;
  // utilitiesIncluded: boolean;
  isExclusive: boolean;
  // isPercentage: boolean;
} & Pick<ContractPreset, "contractTypeId">

export type Estate = {
  estateId: number;
  district: string;
  neighborhood: string;
  addressDetails: string;
  totalArea: number;
  builtArea: number;
  estateDetails: string;
} & Pick<EstatePreset, "estateTypeId">

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

export type ClientPreferences = {
  childrenAllowed: boolean;
  petsAllowed: boolean;
  ownerPreferencesDetails: string;
}

// in listing-details those partial props are not partial but always expected
// is only in liting-form that those props are partial, but I don"t know how
// to differentiate between this a type with all props required and another
// with some of them being optional, this differentiation is necessary because
// because both listing-details and listing-form expect just one type of listing
// data, and not something like "Listing | ListingWithSomePropsOptional"
// for the moment I"m just using this type but is not telling the true really
// since, again, in listing-details the listing type it expect is one with all
// its props required.

export type Listing = 
// & { [prop: string]: string | number | null | boolean; } 
& Omit<Client, "clientAge" | 'clientDetails'>
& PartialBy<Contract, "contractId">
& PartialBy<Estate, "estateId">
& Features 
& House 
& Apartment 
& ClientPreferences;

export type ListingWithoutIds = Omit<Listing, "clientId" | "estateId" | "contractId">; 
