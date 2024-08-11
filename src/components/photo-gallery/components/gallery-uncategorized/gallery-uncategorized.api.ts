import { ChangeEventHandler, ChangeEvent, Dispatch, SetStateAction } from "react";
import { store } from "../../../../redux/redux-store";
import { setIsLoading, unsetIsLoading } from "../../../../redux/app/app.actions";
import { selectCurrentUserId } from "../../../../redux/user/user.selectors";
import { InvalidIdentifierError } from "../../../../errors/auth.errors";
import { Picture } from "../../../listing-detail/listing-detail.types";
import { pictureUploader } from "../../../../utils/utility-functions/utility-functions";
import { signOutWithError } from "../../../../redux/user/user.actions";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;
const { dispatch } = store;

const onUpload = async (
  e: ChangeEvent<HTMLInputElement>, 
  listingId: number,
  setPictures: Dispatch<SetStateAction<Picture[]>>,
  currentPicturesLength: number,
) => {
  try {
    if (!listingId) throw new InvalidIdentifierError(t("noListingIdError"));

    dispatch(setIsLoading(t("waitForPictureUpload", { ns: 'ui' })))
    
    const newPictures = await pictureUploader(e, Number(listingId), currentPicturesLength);
    if (!newPictures) throw new Error(t("picturesIsUndefinedError"));

    setPictures(prev => [ ...prev, ...newPictures ])
    dispatch(unsetIsLoading())
  } catch (err) {
    dispatch(unsetIsLoading())

    if (err instanceof InvalidIdentifierError) {
      return dispatch(signOutWithError(err)) 
    } else {
      // toaster.warning(( err as Error ).message, {
      //   duration: 5
      // });
    };
    
    // if (axios.isAxiosError(err)) {
    //   if (( err as AxiosError ).response?.data.unverifiedUserError) {
    //     toaster.warning(( err as AxiosError ).response?.data.unverifiedUserError.errorMessage, {
    //       description: ( err as AxiosError ).response?.data.unverifiedUserError.errorMessageDescription,
    //       duration: 7
    //     });
    //     return;
    //   } else {
    //     console.error(err)
    //   };
    // };

  }
};

export {
  onUpload
}
