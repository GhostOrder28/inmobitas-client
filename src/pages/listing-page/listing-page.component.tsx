import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Spinner } from "evergreen-ui"
import { AxiosError } from "axios";

import http from "../../http/http";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

import { Presets, Listing } from "./listing-page.types";

import { SpecificationTable } from "../../components/specification-table/specification-table.types";
const ListingForm = lazy(() => import("../../components/listing-form/listing-form.component"));
const ListingDetail = lazy(() => import("../../components/listing-detail/listing-detail.component"));

// function isSpecificationTable (data: Listing | SpecificationTable | undefined): data is SpecificationTable{
//   return (data as SpecificationTable).data.length !== undefined;
// }
//
// function isListingForm (data: ListingForm | SpecificationTable | undefined): data is ListingForm {
//   return Object.keys(data as ListingForm).length > 0;
// }
const ListingPage = () => {

  const location = useLocation();
  const { clientId, listingId } = useParams();
  const [listing, setListing] = useState<Listing>();
  const [presets, setPresets] = useState<Presets>();
  const [error, setError] = useState<Error | null>(null);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {

    (async function () {
      try {
        if (location.pathname !== "/newlisting") {
          let listingData;
          if (location.pathname.includes("/listingdetail")) {
            listingData = await http.get<Listing>(`/listings/${userId}/${clientId}/${listingId}/group`);
          } else {
            listingData = await http.get<Listing>(`/listings/${userId}/${clientId}/${listingId}`);
          }
          const dataPresets = await http.get<Presets>(`/listingpresets`);
          setListing(listingData.data);
          setPresets(dataPresets.data);
        } else {
          const dataPresets = await http.get<Presets>(`/listingpresets`);
          setPresets(dataPresets.data);
        }
      } catch (err) {
        setError((err as AxiosError).response?.data.error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  switch (location.pathname) {
    case "/newlisting":
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} setListing={setListing} />
        </Suspense>
      )
    case `/editlisting/${clientId}/${listingId}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} listing={listing} setListing={setListing} />
        </Suspense>
      )
    case `/listingdetail/${clientId}/${listingId}`:
      // if (!isSpecificationTable(listing)) return;
      return (
        <Suspense fallback={<Spinner />}>
          <ListingDetail dataPresets={presets} listing={listing} />
        </Suspense>
      )
    default:
      return <>no route matched...</>
  }

};

export default ListingPage;
