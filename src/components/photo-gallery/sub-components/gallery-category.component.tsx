import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Picture } from '../../listing-detail/listing-detail.types';
import PicturesContainer from '../../pictures-container/pictures-container.component';
import {
  Pane,
  TextInput, 
  Checkbox, 
  Text, 
  UploadIcon, 
  IconButton,
  EditIcon,
  TickIcon,
  CrossIcon
} from 'evergreen-ui';
import { useTranslation } from "react-i18next";
import { PictureCategoryFromPayload, PictureCategory } from "../../listing-detail/listing-detail.types";
import http from '../../../utils/axios-instance';

type GalleryCategoryProps = {
  name: string;
  categoryId?: number;
  pictures: Picture[];
  setCategories?: Dispatch<SetStateAction<PictureCategory[]>>
  showDeletionMenu: boolean;
  setShowDeletionMenu: Dispatch<SetStateAction<boolean>>
  markedPictures: number[];
  toggleMark: (pictureIdToDelete: number) => void;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  uncategorized?: boolean;
}

const GalleryCategory = ({ 
  name, 
  categoryId,
  pictures, 
  setCategories,
  showDeletionMenu, 
  setShowDeletionMenu, 
  markedPictures, 
  toggleMark, 
  setFullscreenPicture, 
  uncategorized
}: GalleryCategoryProps) => {
  const timeout = useRef<NodeJS.Timeout>();
  const [ editMode, setEditMode ] = useState(false);
  const [ updatedName, setUpdatedname ] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode])

  const updateCategoryName = async () => {
    const { data: newName } = await http.patch(`/categories/${categoryId}`, { name: updatedName })

    // TODO: this is not ideal, maybe there is a way to tell typescript that when uncategorized
    // prop is not set then setCategories is always set
    setCategories!!((prev) => prev.map(c => {
      if (c.categoryId !== categoryId) {
        return c;
      } else {
        return { ...c, name: newName }
      };
    }))

    setEditMode(false);
  };

  return (
    <Pane border="1px solid black">
      <Pane display="flex" justifyContent="space-between">
        <Pane minHeight="2rem" width="100%" display="flex">
          { editMode && setCategories ? // TODO: this is redundant, but typescript doesn't know that
            <>
              <TextInput 
                ref={ inputRef }
                value={ updatedName }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setUpdatedname(e.target.value) }
                width="100%"
              />
            </> : 
            <Text>
              { name }
            </Text>
          }
        </Pane>
        <Pane display="flex">
          { !uncategorized && !editMode ? 
            <IconButton
              icon={ EditIcon }
              onClick={ () => setEditMode(true) }
            /> : ''
          }
          { editMode ?
            <>
              <IconButton icon={TickIcon} onClick={ updateCategoryName } />
              <IconButton icon={CrossIcon} onClick={ () => setEditMode(false) } />
            </> : ''
          }
          <IconButton icon={UploadIcon} />
        </Pane>
      </Pane>
      <Pane
        display="grid"
        gridTemplateColumns={"repeat(4, 1fr)"}
        position={"relative"}
        zIndex={10}
        width={"100%"}
        padding={showDeletionMenu ? "1.5px" : ""}
        transition={"all .3s"}
      >
        {
          pictures.map((file, idx) => {
            return (
              <Pane
                key={`image-${idx}`}
                className="gallery-img-container"
                position={"relative"}
                border={showDeletionMenu ? "3px solid white" : ""}
              >
                <Pane
                  top="0"
                  left="0"
                  cursor={"pointer"}
                  onClick={
                    showDeletionMenu
                      ? () => toggleMark(file.pictureId)
                      : () => setFullscreenPicture(file)
                  }
                  onTouchStart={() => {timeout.current = setTimeout(() => setShowDeletionMenu(true), 500)}}
                  onTouchEnd={ () => clearTimeout(timeout.current) }
                  onTouchMove={() => clearTimeout(timeout.current)}
                >
                  {showDeletionMenu && (
                    <Checkbox
                      position="absolute"
                      top="0"
                      right="0"
                      zIndex="98"
                      size={30}
                      checked={markedPictures.some(
                        (pictureId) => pictureId === file.pictureId
                      )}
                      margin=".6rem"
                      pointerEvents={"none"}
                      transition={"margin .6"}
                    />
                  )}
                  <img
                    className={`gallery-img`}
                    crossOrigin='anonymous'
                    alt=""
                    src={file.smallSizeUrl}
                  />
                </Pane>
              </Pane>
            );
          })            
        }
    </Pane>
  </Pane>
  )
};

export default GalleryCategory;
