import { Dispatch, SetStateAction } from "react";
import { Picture } from '../../listing-detail/listing-detail.types';
import { PictureCategory, PictureCategoryFromPayload } from "../../listing-detail/listing-detail.types";
import { IsLoading } from '../photo-gallery.component';

type CommonProps = {
  categoryPictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  showDeletionMenu: boolean;
  setShowDeletionMenu: Dispatch<SetStateAction<boolean>>
  markedPictures: number[];
  toggleMark: (pictureIdToDelete: number) => void;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  setIsLoading: Dispatch<SetStateAction<IsLoading>>;
}

export type Categorized = {
  name: string;
  categoryId: number;
  setCategories: Dispatch<SetStateAction<PictureCategoryFromPayload[]>>
  deleteCategory: (categoryId: number) => void;
  showCategoryDeleteBtn: boolean;
  setShowCategoryDeleteBtn: Dispatch<SetStateAction<boolean>>
} & CommonProps;

export type Uncategorized = {} & CommonProps
