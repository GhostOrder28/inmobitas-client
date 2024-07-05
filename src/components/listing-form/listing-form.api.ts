import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";
import { Listing, ListingWithoutIds } from "../../pages/listing-page/listing-page.types";
import http from "../../http/http";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import axios  from 'axios';
import { history } from "../..";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";
import { HTTPErrorData } from "../../http/http.types";

const onSubmitListingData = async (
  listingData: Partial<Listing>, 
  setListing: Dispatch<SetStateAction<Listing | undefined>>, 
  setError: UseFormSetError<Listing>,
): Promise<void> => {
  const userId = selectCurrentUserId(store.getState());
  console.log("submitting listingData: ", listingData);

  const { clientId, estateId, contractId } = listingData;
  const formKeys = Object.keys(listingData) as (keyof Listing)[];

  const remainingProps = formKeys.reduce<ListingWithoutIds>((acc, current) => {
    if (!(current === "clientId" || current === "estateId" || current === "contractId")) {
      return { ...acc, [current]: listingData[current] };
    } else {
      return acc;
    }
  }, {} as ListingWithoutIds);

  try {
    const res = history.location.pathname === `/newlisting`
      ? await http.post<Listing>(`/listings/${userId}`, remainingProps)
      : await http.put<Listing>(`/listings/${userId}/${clientId}/${estateId}/${contractId}`, remainingProps);
    
    setListing(res.data);      
    history.push(`/listingdetail/${res.data.clientId}/${res.data.estateId}`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw new Error(`there is an error but it doesn't have a response: ${err}`);

      const errorData: HTTPErrorData = err.response.data;

      if (errorData.validationErrors) {
        handleValidationErrors<Listing>(listingData, errorData.validationErrors, setError); 
      } else {
        throw errorData;
      }
    } else {
      console.error(err)
    };
  }
};

export {
  onSubmitListingData
}
