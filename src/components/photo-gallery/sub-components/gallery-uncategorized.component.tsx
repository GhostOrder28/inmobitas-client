import React, { useRef, ChangeEventHandler } from 'react';
import {
  Pane,
  Checkbox, 
  Text, 
  ArrowUpIcon,
  toaster,
  majorScale,
  minorScale,
  useTheme,
} from 'evergreen-ui';
import { useTranslation } from "react-i18next";
import { Uncategorized } from './gallery-category.types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import { AuthenticationError } from '../../../errors/auth.errors';
import { pictureUploader } from '../../../utils/utility-functions/utility-functions';
import { signOutWithError } from '../../../redux/user/user.actions';
import axios, { AxiosError } from 'axios';
import GalleryCategoryButton from './gallery-category-button.component';
import "./gallery-category.styles.css";

const GalleryUncategorized = ({ 
  categoryPictures, 
  menuMode,
  markedItems,
  toggleMark, 
  setFullscreenPicture, 
  setIsLoading,
  setPictures,
  setMenuMode,
}: Uncategorized) => {
  const timeout = useRef<NodeJS.Timeout>();
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();
  const { t } = useTranslation(['listing']);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (!userId) throw new AuthenticationError(t('noUserIdError'));
      if (!listingid) throw new Error(t('noListingIdError'));

      setIsLoading('upload')
      const newPictures = await pictureUploader(e, userId, Number(listingid), categoryPictures.length);
      if (!newPictures) throw new Error(t('picturesIsUndefinedError'));
      setPictures(prev => [ ...prev, ...newPictures ])
      setIsLoading(null)
    } catch (err) {
      setIsLoading(null);

      if (err instanceof AuthenticationError) {
        return dispatch(signOutWithError({ clientError: err })) 
      };
      
      if (axios.isAxiosError(err)) {
        if (( err as AxiosError ).response?.data.unverifiedUserError) {
          toaster.warning(( err as AxiosError ).response?.data.unverifiedUserError.errorMessage, {
            description: ( err as AxiosError ).response?.data.unverifiedUserError.errorMessageDescription,
            duration: 7
          });
          return;
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
    <Pane>
      <Pane 
        display="flex"
        justifyContent="space-between"
        borderTop={ `1px solid ${colors.gray500}` }
        borderBottom={ `1px solid ${colors.gray500}` }
      >
        <Pane 
          display="flex"
          minHeight={ majorScale(6) }
          justifyContent="space-between"
          alignItems="center"
          paddingLeft={ minorScale(3) }
        >
          <Text fontStyle='italic'>{ t('uncategorized') }</Text>
        </Pane>
        <Pane display="flex">
          <GalleryCategoryButton 
            borderColor={ colors.gray500 }
            size={ majorScale(6) }
            upload={
              <Pane>
                <input
                  id={ `upload-btn-uncategorized` }
                  className='upload-btn'
                  type="file"
                  onChange={(e) => onUpload(e)}
                  multiple
                  accept="image/*"
                />
                <label
                  htmlFor={ `upload-btn-uncategorized` }
                  className="upload-btn-label"
                >
                  <ArrowUpIcon size={20} color={"#3A3E58"} />
                </label>
              </Pane>
            }
          />
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
                border={menuMode === 'pictures' ? "3px solid white" : ""}
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

export default GalleryUncategorized;
