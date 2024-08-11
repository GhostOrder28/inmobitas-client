import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { getClientListings } from "./client-detail.api";

const useGetClientListings = (clientId: string | undefined): [ ListingItem[], Dispatch<SetStateAction<ListingItem[]>> ] => {
  const [ clientListings, setClientListings ] = useState<ListingItem[]>([]);

  useEffect(() => {
    (async function () {
      if (!clientId) return setClientListings([]);
      const { data: listings } = await getClientListings(clientId);
      setClientListings(listings)
    })()
  }, [])

  return [ clientListings, setClientListings ];
};

export {
  useGetClientListings
}
