import { createContext } from "react"
import { PhotoGalleryCtxType } from "./photo-gallery.types"

export const PhotoGalleryCtx = createContext<PhotoGalleryCtxType>({} as PhotoGalleryCtxType)
