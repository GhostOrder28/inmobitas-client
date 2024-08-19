import { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { GalleryCategoryForm } from "./gallery-category.types";

const cancelUpdateName = (
  reset: UseFormReset<GalleryCategoryForm>,
  setEditMode: Dispatch<SetStateAction<boolean>>
) => {
  reset()
  setEditMode(false);
};

const useDetectNew = (
  newlyCreated: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (newlyCreated) setEditMode(true);
  }, [])
};

export {
  cancelUpdateName,
  useDetectNew,
}
