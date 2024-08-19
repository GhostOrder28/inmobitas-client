import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";
import { Listing } from "../../pages/listing-page/listing-page.types";
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
  setError: UseFormSetError<Listing>,
  listingData: Partial<Listing>, 
  setListing?: Dispatch<SetStateAction<Listing | undefined>>, 
): Promise<void> => {
  const userId = selectCurrentUserId(store.getState());
  const { pathname  } = history.location;

  const { clientId, estateId, contractId, ...remainingProps } = listingData;

  try {
    const { data } = pathname === `/newlisting`
      ? await http.post<Listing>(`/listings/${userId}`, remainingProps)
      : await http.put<Listing>(`/listings/${userId}/${clientId}/${estateId}/${contractId}`, remainingProps);
    
    // I don't like this, I'm checking is setListing is undefined
    // but when the path is not "/newlisting" setListing is never undefined
    // how could I tell typescript that?
    if (pathname !== "/newlisting" && setListing) setListing(data);      

    history.push(`/client/${data.clientId}/listing/${data.estateId}/info`);
  } catch (error) {
    if (!axios.isAxiosError(error)) return console.error(t("nonAxiosError", { ns: 'error' }), error);

    const { data: { validationErrors } } = error.response!!;
    handleValidationErrors<Listing>(listingData, validationErrors, setError); 
  }
};

export {
  onSubmitListingData
}
