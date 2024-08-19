import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { strParseOut } from "../../utils/utility-functions/utility-functions";
import { EstatePreset, Listing, Presets } from "../../pages/listing-page/listing-page.types";
import { presetSelector } from "../../utils/utility-functions/utility-functions";
import { ContractPreset } from "../../pages/listing-page/listing-page.types";

i18next.use(initReactI18next).init()

function formatListingData (listing: Listing, presets: Presets) {
  console.log('listing: ', listing);
  const { t } = i18next;
  const { contractTypeId, estateTypeId } = listing;
  const { contractTypes, estateTypes } = presets;

  const { contractName } = presetSelector<ContractPreset>(contractTypes, contractTypeId);
  const { estateName } = presetSelector<EstatePreset>(estateTypes, estateTypeId);

  return {
    clientId: listing.clientId,
    estateId: listing.estateId,
    contractId: listing.contractId,
    data: [
    {
      header: t("owner", { ns: "client" }),
      items: [
        {
          label: t("name", { ns: "client" }),
          value: listing.clientName ? strParseOut(listing.clientName) : ""
        },
        {
          label: t("phone", { ns: "client" }),
          value: Number(listing.clientContactPhone)
        }
      ]
    },
    {
      header: t("contract", { ns: "listing" }),
      items: [
        {
          label: t("contractType", { ns: "listing" }),
          value: contractName
        },
        {
          label: t("exclusive", { ns: "listing" }),
          value: listing.isExclusive ? t("yes", { ns: "listing" }) : t("no", { ns: "listing" })
        }
      ]
    },
    ...(listing.contractTypeId === 2 ? [{
      header: t("ownerPreferences", { ns: "listing" }),
      items: [
        {
          label: t("petsAllowed", { ns: "listing" }),
          value: listing.petsAllowed ? t("yes", { ns: "listing" }) : t("no", { ns: "listing" })
        },
        {
          label: t("childrenAllowed", { ns: "listing" }),
          value: listing.childrenAllowed ? t("yes", { ns: "listing" }) : t("no", { ns: "listing" })
        },
        {
          label: t("preferenceDetails", { ns: "listing" }),
          value: listing.ownerPreferencesDetails 
        }
      ]
    }] : []),
    {
      header: t("location", { ns: "listing" }),
      items: [
        {
          label: t("district", { ns: "listing" }),
          value: listing.district ? strParseOut(listing.district) : ""
        },
        {
          label: t("neighborhood", { ns: "listing" }),
          value: listing.neighborhood ? strParseOut(listing.neighborhood) : ""
        },
        {
          label: t("addressDetails", { ns: "listing" }),
          value: listing.addressDetails 
        }
      ]
    },
    {
      header: t("listing", { ns: "listing" }),
      items: [
        {
          label: t("estateType", { ns: "listing" }),
          value: estateName,
        },
        ...listing.estateTypeId !== 1 ? [{
          label: t("floorLocation", { ns: "listing" }),
          value: listing.floorLocation 
        }] : [],
        ...listing.contractTypeId === 1 ? [{
          label: t("numberOfFloors", { ns: "listing" }),
          value: listing.numberOfFloors 
        }] : [],
        {
          label: t("totalArea", { ns: "listing" }),
          value: listing.totalArea && `${listing.totalArea} m²`
        },
        {
          label: t("builtArea", { ns: "listing" }),
          value: listing.builtArea && `${listing.builtArea} m²`
        },
        {
          label: t("bedrooms", { ns: "listing" }),
          value: listing.numberOfBedrooms 
        },
        {
          label: t("bathrooms", { ns: "listing" }),
          value: listing.numberOfBathrooms 
        },
        {
          label: t("garages", { ns: "listing" }),
          value: listing.numberOfGarages 
        },
        {
          label: t("kitchens", { ns: "listing" }),
          value: listing.numberOfKitchens 
        },
        {
          label: t("naturalGas", { ns: "listing" }),
          value: listing.haveNaturalGas ? t("yes", { ns: "listing" }) : t("no", { ns: "listing" }) 
        },
        {
          label: t("estateDetails", { ns: "listing" }),
          value: listing.estateDetails
        }
      ]
    }
  ]
  }
}

export {
  formatListingData,
}
