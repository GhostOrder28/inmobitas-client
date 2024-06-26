import { Dispatch, SetStateAction } from "react";
import { Listing, ListingWithoutIds } from "../../pages/listing-page/listing-page.types";
import http from "../../utils/axios-instance";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { AxiosError } from "axios";
import { ValidationError } from "../../redux/redux.types";
import { history } from "../..";

const onSubmitListingData = async (
  listingData: Partial<Listing>, 
  setListing: Dispatch<SetStateAction<Listing | undefined>>, 
  setErrors: Dispatch<SetStateAction<AxiosError<{ validationErrors: ValidationError[] }> | undefined>>
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
    setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
  }
};

export {
  onSubmitListingData
}
