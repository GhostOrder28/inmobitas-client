import { Dispatch, SetStateAction, ChangeEventHandler, ChangeEvent } from "react";
import http from "../../../../http/http";
import axios from "axios";
import { GalleryCategoryForm } from "./gallery-category.types";
import { PictureCategoryFromPayload } from "../../../listing-detail/listing-detail.types";
import { handleValidationErrors } from "../../../../utils/utility-functions/utility-functions";
import { UseFormSetError } from "react-hook-form";
import { store } from "../../../../redux/redux-store";
import { selectCurrentUserId } from "../../../../redux/user/user.selectors";
import { InvalidIdentifierError } from "../../../../errors/auth.errors";
import { Picture } from "../../../listing-detail/listing-detail.types";
import { pictureUploader } from "../../../../utils/utility-functions/utility-functions";
import { signOutWithError } from "../../../../redux/user/user.actions";
import { setIsLoading, unsetIsLoading } from "../../../../redux/app/app.actions";
import { toaster } from "evergreen-ui";
import { UploadError } from "../../../../errors/app.errors";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;
const { dispatch } = store;

const updateName = async (
  categoryFormData: GalleryCategoryForm,
  categoryId: number,
  setCategories: Dispatch<SetStateAction<PictureCategoryFromPayload[]>>,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  setError: UseFormSetError<GalleryCategoryForm>
) => {
  try {
    const { 
      data: { 
        name: updatedName
      }
    } = await http.patch<GalleryCategoryForm>(`/categories/${categoryId}`, categoryFormData)

    setCategories((prev) => prev.map(c => {
      if (c.categoryId !== categoryId) {
        return c;
      } else {
        return { ...c, name: updatedName }
      };
    }))

    setEditMode(false);
  } catch (error) {
    if (!axios.isAxiosError(error)) return console.error(t("nonAxiosError", { ns: 'error' }), error);

    const { data: { validationErrors } } = error.response!!;
    handleValidationErrors<GalleryCategoryForm>(categoryFormData, validationErrors, setError); 
  }
};

const onUpload = async (
  e: ChangeEvent<HTMLInputElement>, 
  listingId: number,
  setPictures: Dispatch<SetStateAction<Picture[]>>,
  currentPicturesLength: number,
  categoryId: number,
) => {
  try {
    if (!listingId) throw new InvalidIdentifierError(t("noListingIdError"));

    dispatch(setIsLoading(t("waitForPictureUpload", { ns: "ui" })))

    const newPictures = await pictureUploader(e, listingId, currentPicturesLength, categoryId);
    if (!newPictures) throw new UploadError(t("picturesUploadError", { ns: "error" }));

    setPictures(prev => [ ...prev, ...newPictures ])
    dispatch(unsetIsLoading())
  } catch (error) {
    dispatch(unsetIsLoading())

    if (error instanceof InvalidIdentifierError) {
      return store.dispatch(signOutWithError(error)) 
    };

    if (error instanceof UploadError) {
      toaster.warning(error.message, {
        description: error.suggestion,
        duration: 5
      });
    };

    console.error(error)
  }
};

export {
  updateName,
  onUpload,
}
