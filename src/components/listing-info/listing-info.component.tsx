import { lazy } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPathLastFragment } from "../../utils/utility-functions/utility-functions";

import "./listing-info-gallery.styles.css";
import { useGetListingData, useGetListingPresets } from "./listing-info.hooks";

const ListingForm = lazy(() => import("../listing-form/listing-form.component"));
const DetailedTable = lazy(() => import("../detailed-table/detailed-table.component"));

const ListingInfo = () => {
  const { estateId, clientId } = useParams();
  const { pathname } = useLocation();
  const page = getPathLastFragment(pathname);

  const [ listing, setListing ] = useGetListingData(clientId, estateId);
  const presets = useGetListingPresets();

  return (
    <>
      { page === "info" && listing && presets &&
        <DetailedTable source={listing} presets={presets}/> 
      }
      { page === "form" && 
        <ListingForm presets={presets} setListing={setListing}/> 
      }
    </>
  );
};
export default ListingInfo;
