import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Listing } from "../../pages/listing-page/listing-page.types";
import { Presets } from "../../pages/listing-page/listing-page.types";
import { getListingData, getPresets } from "./listing-info.api";

type UseGetListingDataRT = [
  listing: Listing | undefined,
  setListing: Dispatch<SetStateAction<Listing | undefined>>,
]

const useGetListingData = (clientId: string | undefined, estateId: string | undefined): UseGetListingDataRT => {
  const [ listing, setListing ] = useState<Listing>();

  useEffect(() => {
    (async function () {
      if (!clientId || !estateId) return;
      const { data: listingData } = await getListingData(clientId, estateId);
      setListing(listingData);
    })()
  },[])

  return [ listing, setListing ];
};

const useGetListingPresets = () => {
  const [ presets, setPresets ] = useState<Presets>();

  useEffect(() => {
    (async function () {
      const { data: presetsData } = await getPresets();
      setPresets(presetsData)
    })()
  }, [])

  return presets;
};

export {
  useGetListingData,
  useGetListingPresets,
}
