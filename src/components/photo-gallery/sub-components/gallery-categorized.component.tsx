import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react';
import {
  Pane,
  TextInput, 
  Checkbox, 
  Strong,
  ArrowUpIcon,
  EditIcon,
  TickIcon,
  CrossIcon,
  toaster,
  useTheme,
  minorScale,
  majorScale,
} from 'evergreen-ui';
import { PictureCategoryUpdatedNamePayload } from "../../listing-detail/listing-detail.types";
import { Categorized } from './gallery-category.types';
import http from '../../../http/http';
import { pictureUploader } from '../../../utils/utility-functions/utility-functions';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signOutWithError } from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { InvalidIdentifierError } from '../../../errors/auth.errors';
import axios, { AxiosError } from 'axios';
import "./gallery-category.styles.css";
import GalleryCategoryButton from './gallery-category-button.component';
import { strParseOut } from '../../../utils/utility-functions/utility-functions';

const GalleryCategorized = ({ 
    categoryId,
    name, 
    isNew,
    categoryPictures, 

    menuMode,
    markedItems,
    toggleMark, 

    setMenuMode,
    setPictures,
    setCategories,
    setFullscreenPicture, 
    setIsLoading,
  }: Categorized) => {
  const [ editableName, setEditableName ] = useState<string>('');
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ userInteraction, setUserInteraction ] = useState(false);

  console.log('interaction: ', isNew, userInteraction);
  const timeout = useRef<NodeJS.Timeout>();
  const categoryTouchTimeout = useRef<NodeJS.Timeout>();

  const inputRef = useRef<HTMLInputElement>(null);

  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();
  const { t } = useTranslation(['error', 'ui']);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  // auto focus input
  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode])

  useEffect(() => {
    setEditableName(name)
    if (isNew && !userInteraction && inputRef.current) {
      inputRef.current.focus();
    };
  }, [])

  const updateName = async () => {
    const { 
      data: { 
        updatedName: updatedNamePlayload 
      }
    } = await http.patch<PictureCategoryUpdatedNamePayload>(`/categories/${categoryId}`, { name: editableName })

    setCategories((prev) => prev.map(c => {
      if (c.categoryId !== categoryId) {
        return c;
      } else {
        return { ...c, name: updatedNamePlayload }
      };
    }))

    setEditMode(false);
    setUserInteraction(true);
  };

  const cancelUpdateName = () => {
    setEditableName(name)
    setEditMode(false);
    setUserInteraction(true);
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (!userId) throw new InvalidIdentifierError(t('noUserIdError'));
      if (!listingid) throw new InvalidIdentifierError(t('noListingIdError'));

      setIsLoading('upload')
      const newPictures = await pictureUploader(e, userId, Number(listingid), categoryPictures.length, categoryId);
      if (!newPictures) throw new Error(t('picturesIsUndefinedError'));
      setPictures(prev => [ ...prev, ...newPictures ])
      setIsLoading(null)
    } catch (err) {
      setIsLoading(null);

      if (err instanceof InvalidIdentifierError) {
        return dispatch(signOutWithError(err)) 
      };
      // 
      // if (axios.isAxiosError(err)) {
      //   if (( err as AxiosError ).response?.data.unverifiedUserError) {
      //     toaster.warning(( err as AxiosError ).response?.data.unverifiedUserError.errorMessage, {
      //       description: ( err as AxiosError ).response?.data.unverifiedUserError.errorMessageDescription,
      //       duration: 7
      //     });
      //   } else {
      //     console.error(err)
      //   };
      // };
      //
      // toaster.warning(( err as Error ).message, {
      //   duration: 5
      // });
    }
  };

  return (
    <Pane borderTop={ `1px solid ${colors.gray500}` }>
      <Pane 
        display="flex"
        minHeight={ majorScale(6) }
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={ colors.gray100 }
        borderBottom={ `1px solid ${colors.gray500}` }
        onTouchStart={ () => {categoryTouchTimeout.current = setTimeout(() => {
          setMenuMode('categories')
        }, 500)} }
        onTouchEnd={ () => clearTimeout(categoryTouchTimeout.current) }
        onTouchMove={ () => clearTimeout(categoryTouchTimeout.current) }
        onClick={ menuMode === 'categories' ? () => toggleMark(categoryId) : undefined }
        paddingRight={ menuMode === 'categories' ? minorScale(3) : 0 }
        cursor={ menuMode === 'categories' ? 'pointer' : 'default' }
      >
        <Pane 
          display="flex"
          width="100%" 
          paddingX={ minorScale(3) }
        >
          { editMode || ( isNew && !userInteraction ) ? 
            <>
              <TextInput 
                ref={ inputRef }
                value={ editableName }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setEditableName(e.target.value) }
                width="100%"
                border="none"
                backgroundColor="transparent"
              />
            </> : 
            <Strong>
              { editableName ? strParseOut(editableName) : '' }
            </Strong>
          }
        </Pane>
        <Pane display="flex">
          { !editMode && menuMode === null && ( !isNew || userInteraction ) ? 
            <>
              <GalleryCategoryButton
                icon={ EditIcon }
                onClick={ () => setEditMode(true) }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
              <GalleryCategoryButton 
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
                upload={
                  <Pane>
                    <input
                      id={ `upload-btn-${categoryId}` }
                      className='upload-btn'
                      type="file"
                      onChange={(e) => onUpload(e)}
                      multiple
                      accept="image/*"
                    />
                    <label
                      htmlFor={ `upload-btn-${categoryId}` }
                      className="upload-btn-label"
                    >
                      <ArrowUpIcon size={20} color={"#3A3E58"} />
                    </label>
                  </Pane>
                }
              />
            </>
            : ''
          }
          { editMode || ( isNew && !userInteraction )?
            <>
              <GalleryCategoryButton
                icon={ TickIcon }
                color={ colors.green500 }
                onClick={ updateName }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
              <GalleryCategoryButton
                icon={ CrossIcon }
                color={ colors.red500 }
                onClick={ cancelUpdateName }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
            </> : ''
          }
          { menuMode === 'categories' ?
            <Checkbox
              size={30}
              checked={ markedItems.some((id) => id === categoryId) }
              pointerEvents={"none"}
            />
            : ''
          }
        </Pane>
      </Pane>
      <Pane
        display="grid"
        gridTemplateColumns={"repeat(4, 1fr)"}
        position={"relative"}
        zIndex={10}
        width={"100%"}
        padding={menuMode === 'pictures' && categoryPictures.length ? "1.5px" : ""}
        transition={"all .3s"}
      >
        {
          categoryPictures.map((file, idx) => {
            return (
              <Pane
                key={`image-${idx}`}
                className="gallery-img-container"
                position={"relative"}
                border={menuMode === 'pictures' && categoryPictures.length ? "3px solid white" : ""}
              >
                <Pane
                  top="0"
                  left="0"
                  cursor={"pointer"}
                  onClick={
                    menuMode === 'pictures'
                      ? () => toggleMark(file.pictureId)
                      : () => setFullscreenPicture(file)
                  }
                  onTouchStart={() => {timeout.current = setTimeout(() => setMenuMode('pictures'), 500)}}
                  onTouchEnd={ () => clearTimeout(timeout.current) }
                  onTouchMove={() => clearTimeout(timeout.current)}
                >
                  {menuMode === 'pictures' && (
                    <Checkbox
                      position="absolute"
                      top="0"
                      right="0"
                      zIndex="98"
                      size={30}
                      checked={markedItems.some(
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

export default GalleryCategorized;
