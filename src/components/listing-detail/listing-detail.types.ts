export type Picture = {
  filename: string;
  pictureId: number;
  position: number;
  categoryId?: number;
  smallSizeUrl: string;
  largeSizeUrl: string;
}

export type PictureCategory = {
  categoryId: number;
  name: string;
  position: number;
  categoryPictures: Picture[];
}

export type PictureCategoryFromPayload = Omit<PictureCategory, 'categoryPictures'>
