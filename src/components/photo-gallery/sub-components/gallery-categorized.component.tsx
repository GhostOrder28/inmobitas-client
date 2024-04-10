import React, { useState, useEffect, useRef, ChangeEventHandler, MouseEventHandler} from 'react';
import {
  Pane,
  TextInput, 
  Checkbox, 
  Text, 
  Strong,
  ArrowUpIcon,
  IconButton,
  EditIcon,
  TickIcon,
  CrossIcon,
  TrashIcon,
  toaster,
  useTheme,
  minorScale,
  majorScale,
} from 'evergreen-ui';
import { PictureCategoryUpdatedNamePayload } from "../../listing-detail/listing-detail.types";
import { Categorized } from './gallery-category.types';
import http from '../../../utils/axios-instance';
import useClickOutside from '../../../hooks/use-click-outside';
import { pictureUploader } from '../../../utils/utility-functions';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signOutWithError } from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { AuthenticationError } from '../../../errors/auth.errors';
import axios, { AxiosError } from 'axios';
import "./gallery-category.styles.css";
import GalleryCategoryButton from './gallery-category-button.component';
import { css } from 'glamor';
import { strParseOut } from '../../../utils/utility-functions';

const hoverStyle = css({
  ':focus': {
    'outline': 'none !important',
  }
}).toString();

const GalleryCategorized = ({ 
    name, 
    categoryId,
    categoryPictures, 
    deleteCategory,
    setPictures,
    setCategories,
    showCategoryDeleteBtn,
    setShowCategoryDeleteBtn,
    showDeletionMenu, 
    setShowDeletionMenu, 
    markedPictures, 
    toggleMark, 
    setFullscreenPicture, 
    setIsLoading
  }: Categorized) => {
  const timeout = useRef<NodeJS.Timeout>();
  const categoryTouchTimeout = useRef<NodeJS.Timeout>();
  const [ editMode, setEditMode ] = useState(false);
  const [ updatedName, setUpdatedname ] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteCategoryBtnRef = useRef<HTMLDivElement>(null);
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();
  const { t } = useTranslation(['error']);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useClickOutside<HTMLDivElement>(deleteCategoryBtnRef, () => setShowCategoryDeleteBtn(false));
  
  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode])

  const updateCategoryName = async () => {
    const { 
      data: { 
        updatedName: updatedNamePlayload 
      }
    } = await http.patch<PictureCategoryUpdatedNamePayload>(`/categories/${categoryId}`, { name: updatedName })

    setCategories((prev) => prev.map(c => {
      if (c.categoryId !== categoryId) {
        return c;
      } else {
        return { ...c, name: updatedNamePlayload }
      };
    }))

    setEditMode(false);
  };

  useEffect(() => { console.log('categoryId: ', categoryId); }, [ categoryId ])

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (!userId) throw new AuthenticationError(t('noUserIdError'));
      if (!listingid) throw new Error(t('noListingIdError'));

      setIsLoading('upload')
      const newPictures = await pictureUploader(e, userId, Number(listingid), categoryPictures.length, categoryId);
      if (!newPictures) throw new Error(t('picturesIsUndefinedError'));
      setPictures(prev => [ ...prev, ...newPictures ])
      setIsLoading(null)
    } catch (err) {
      if (err instanceof AuthenticationError) {
        return dispatch(signOutWithError({ clientError: err })) 
      };
      
      if (axios.isAxiosError(err)) {
        if (( err as AxiosError ).response?.data.unverifiedUserError) {
          toaster.warning(( err as AxiosError ).response?.data.unverifiedUserError.errorMessage, {
            description: ( err as AxiosError ).response?.data.unverifiedUserError.errorMessageDescription,
            duration: 7
          });
        } else {
          console.error(err)
        };
      };

      toaster.warning(( err as Error ).message, {
        duration: 5
      });
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
      >
        <Pane 
          display="flex"
          width="100%" 
          paddingLeft={ minorScale(3) }
          onTouchStart={ () => {categoryTouchTimeout.current = setTimeout(() => setShowCategoryDeleteBtn!!(true), 500)} }
          onTouchEnd={ () => clearTimeout(categoryTouchTimeout.current) }
          onTouchMove={ () => clearTimeout(categoryTouchTimeout.current) }
        >
          { editMode ? 
            <>
              <TextInput 
                ref={ inputRef }
                value={ updatedName }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setUpdatedname(e.target.value) }
                width="100%"
                border="none"
                backgroundColor="transparent"
                className={hoverStyle}
              />
            </> : 
            <Strong>
              { strParseOut(name) }
            </Strong>
          }
        </Pane>
        <Pane display="flex">
          { !editMode && !showCategoryDeleteBtn ? 
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
          { editMode ?
            <>
              <GalleryCategoryButton
                icon={ TickIcon }
                color={ colors.green500 }
                onClick={ updateCategoryName }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
              <GalleryCategoryButton
                icon={ CrossIcon }
                color={ colors.red500 }
                onClick={ () => setEditMode(false) }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
            </> : ''
          }
          { showCategoryDeleteBtn
            ? <GalleryCategoryButton
                ref={ deleteCategoryBtnRef }
                icon={ TrashIcon }
                onClick={ () => deleteCategory(categoryId) }
                color={ colors.red500 }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
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
        padding={showDeletionMenu ? "1.5px" : ""}
        transition={"all .3s"}
      >
        {
          categoryPictures.map((file, idx) => {
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

export default GalleryCategorized;
