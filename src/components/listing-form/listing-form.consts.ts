import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { CLIENT_FORM_INITIAL_STATE } from "../client-form/client-form.consts";
import { Listing } from "../../pages/listing-page/listing-page.types";

const { clientAge, clientDetails, ...remainingClientProps } = CLIENT_FORM_INITIAL_STATE;

i18next.use(initReactI18next).init()
const { t } = i18next;

const LISTING_FORM_INITIAL_STATE: Listing = {
  ...remainingClientProps,

  // presets
  contractTypeId: 1,
  // currencyTypeId: NaN,
  // currencyName: "",
  // currencySymbol: "",
  estateTypeId: 1,

  // contract
  contractId: NaN,
  // listingPrice: NaN,
  // fee: NaN,
  // signedDate: NaN,
  // startDate: NaN,
  // endDate: NaN,
  // utilitiesIncluded: false,
  isExclusive: false,
  // isPercentage: false,

  // listing
  estateId: NaN,
  district: "",
  neighborhood: "",
  addressDetails: "",
  totalArea: NaN,
  builtArea: NaN,
  estateDetails: "",

  // features
  numberOfBedrooms: NaN,
  numberOfBathrooms: NaN,
  numberOfGarages: NaN,
  numberOfKitchens: NaN,
  haveNaturalGas: false,
  numberOfFloors: NaN,
  floorLocation: NaN,

  // client preferences
  childrenAllowed: false,
  petsAllowed: false,
  ownerPreferencesDetails: "",
}

export {
  LISTING_FORM_INITIAL_STATE,
}
