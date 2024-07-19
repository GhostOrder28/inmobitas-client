import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { strParseOut } from "../../utils/utility-functions/utility-functions";
import { EstatePreset, Listing, Presets } from "./listing-page.types";
import { presetSelector } from "../../utils/utility-functions/utility-functions";
import { ContractPreset } from "../../pages/listing-page/listing-page.types";

i18next.use(initReactI18next).init()

function getStructuredData (listingData: Listing, presets: Presets) {
  const { t } = i18next;
  const { contractTypeId, estateTypeId } = listingData;
  const { contractTypes, estateTypes } = presets;

  const { contractName } = presetSelector<ContractPreset>(contractTypes, contractTypeId);
  const { estateName } = presetSelector<EstatePreset>(estateTypes, estateTypeId);

  return {
    clientId: listingData.clientId,
    estateId: listingData.estateId,
    contractId: listingData.contractId,
    data: [
    {
      header: t("owner"),
      items: [
        {
          label: t("name"),
          value: strParseOut(listingData.clientName)
        },
        {
          label: t("phone"),
          value: Number(listingData.clientContactPhone)
        }
      ]
    },
    {
      header: t("contract"),
      items: [
        {
          label: t("contractType"),
          value: contractName
        },
        {
          label: t("exclusive"),
          value: listingData.isExclusive ? t("yes") : t('no')
        }
      ]
    },
    ...(listingData.contractTypeId === 2 ? [{
      header: t("ownerPreferences"),
      items: [
        {
          label: t("petsAllowed"),
          value: listingData.petsAllowed ? t("yes") : t('no')
        },
        {
          label: t("childrenAllowed"),
          value: listingData.childrenAllowed ? t("yes") : t('no')
        },
        {
          label: t("preferencesDetails"),
          value: listingData.ownerPreferencesDetails 
        }
      ]
    }] : []),
    {
      header: t("location"),
      items: [
        {
          label: t("district"),
          value: strParseOut(listingData.district) 
        },
        {
          label: t("neighborhood"),
          value: strParseOut(listingData.neighborhood) 
        },
        {
          label: t("addressDetails"),
          value: listingData.addressDetails 
        }
      ]
    },
    {
      header: t("estate"),
      items: [
        {
          label: t("estateType"),
          value: estateName,
        },
        ...listingData.estateTypeId !== 1 ? [{
          label: t("floorLocation"),
          value: listingData.floorLocation 
        }] : [],
        ...listingData.contractTypeId === 1 ? [{
          label: t("numberOfFloors"),
          value: listingData.numberOfFloors 
        }] : [],
        {
          label: t("totalArea"),
          value: listingData.totalArea && `${listingData.totalArea} m²`
        },
        {
          label: t("builtArea"),
          value: listingData.builtArea && `${listingData.builtArea} m²`
        },
        {
          label: t("bedrooms"),
          value: listingData.numberOfBedrooms 
        },
        {
          label: t("bathrooms"),
          value: listingData.numberOfBathrooms 
        },
        {
          label: t("garages"),
          value: listingData.numberOfGarages 
        },
        {
          label: t("kitchens"),
          value: listingData.numberOfKitchens 
        },
        {
          label: t("naturalGas"),
          value: listingData.haveNaturalGas ? t("yes") : t('no') 
        },
        {
          label: t("estateDetails"),
          value: listingData.estateDetails
        }
      ]
    }
  ]
  }
}

export {
  getStructuredData,
}
