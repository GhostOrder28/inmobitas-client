import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";
import { Listing, ListingWithoutIds } from "../../pages/listing-page/listing-page.types";
import http from "../../http/http";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import axios  from "axios";
import { history } from "../..";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;

const onSubmitListingData = async (
  listingData: Partial<Listing>, 
  setListing: Dispatch<SetStateAction<Listing | undefined>>, 
  setError: UseFormSetError<Listing>,
): Promise<void> => {
  const userId = selectCurrentUserId(store.getState());

  const { clientId, estateId, contractId, ...remainingProps } = listingData;

  try {
    const res = history.location.pathname === `/newlisting`
      ? await http.post<Listing>(`/listings/${userId}`, remainingProps)
      : await http.put<Listing>(`/listings/${userId}/${clientId}/${estateId}/${contractId}`, remainingProps);
    
    setListing(res.data);      
    history.push(`/listingdetail/${res.data.clientId}/${res.data.estateId}`);
  } catch (error) {
    if (!axios.isAxiosError(error)) return console.error(t("nonAxiosError", { ns: 'error' }), error);

    const { data: { validationErrors } } = error.response!!;
    handleValidationErrors<Listing>(listingData, validationErrors, setError); 
  }
};

export {
  onSubmitListingData
}
