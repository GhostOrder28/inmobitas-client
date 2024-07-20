import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import { GalleryCategoryForm } from "./gallery-category.types";

const cancelUpdateName = (
  reset: UseFormReset<GalleryCategoryForm>,
  setEditMode: Dispatch<SetStateAction<boolean>>
) => {
  reset()
  setEditMode(false);
};

export {
  cancelUpdateName,
}
