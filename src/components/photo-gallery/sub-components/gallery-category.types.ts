import { Dispatch, SetStateAction } from "react";
import { Picture } from '../../listing-detail/listing-detail.types';
import { PictureCategory, PictureCategoryFromPayload } from "../../listing-detail/listing-detail.types";
import { IsLoading, MenuMode } from '../photo-gallery.component';

type CommonProps = {
  categoryPictures: Picture[];
  menuMode: MenuMode;
  markedItems: number[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  setMenuMode: Dispatch<SetStateAction<MenuMode>>;
  toggleMark: (currentId: number) => void;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  setIsLoading: Dispatch<SetStateAction<IsLoading>>;
}

export type Categorized = {
  name: string;
  categoryId: number;
  position: number;
  setCategories: Dispatch<SetStateAction<PictureCategoryFromPayload[]>>
} & CommonProps;

export type Uncategorized = {} & CommonProps
