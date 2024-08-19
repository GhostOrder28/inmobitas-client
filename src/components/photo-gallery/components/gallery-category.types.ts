import { Dispatch, SetStateAction } from "react";
import { Picture } from "../../listing-info/listing-info.types";
import { PictureCategory, PictureCategoryFromPayload } from "../../listing-info/listing-info.types";
import { MenuMode } from "../photo-gallery.types";
import { TextInput } from "evergreen-ui";

type CommonProps = {
  categoryPictures: Picture[];
  menuMode: MenuMode;
  markedItems: number[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  setMenuMode: Dispatch<SetStateAction<MenuMode>>;
  toggleMark: (currentId: number) => void;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
};

export type Categorized = {
  name: string;
  categoryId: number;
  position: number;
  setCategories: Dispatch<SetStateAction<PictureCategoryFromPayload[]>>;
  newlyCreated?: boolean;
} & CommonProps;

export type Uncategorized = {} & CommonProps
