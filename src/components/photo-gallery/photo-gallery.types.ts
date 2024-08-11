import { Dispatch, SetStateAction } from "react";
import { Picture } from "../listing-detail/listing-detail.types"

export type MenuMode = "pictures" | "categories" | null;

export type PhotoGalleryProps = {
  generatePresentationFilename: () => string;
  display: string;
};

export type FullScreenProps = {
  userId: number | undefined; // actually this would never be undefined, but i don"t know how to enforce a type in a selector and it returns an optional undefined per default.
  fullscreenPicture: Picture;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  cloudinaryPicturesPath: string;
};

export type PhotoGalleryCtxType = {
  menuMode: MenuMode;
  setMenuMode: Dispatch<SetStateAction<MenuMode>>;
  toggleMark: (currentId: number) => void;
}
