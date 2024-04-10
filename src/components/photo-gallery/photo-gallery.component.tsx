import React, { Dispatch, SetStateAction, useEffect, useState, useRef, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { 
  Pane, 
  TrashIcon,
  FolderNewIcon,
  DocumentIcon,
} from "evergreen-ui";
import { useTranslation } from "react-i18next";

import useRelativeHeight from '../../hooks/use-relative-height';
import useWindowDimensions from "../../hooks/use-window-dimensions";

import { DESKTOP_BREAKPOINT_VALUE } from '../../constants/breakpoints.constants';
import http from "../../utils/axios-instance";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import GalleryMenu from "../gallery-menu/gallery-menu.component";
import DeletionPanel from "../deletion-panel/deletion-panel.component";
import "./photo-gallery.styles.css";
import { Picture, PictureCategory, PictureCategoryFromPayload } from "../listing-detail/listing-detail.types";
import PopupMessage from "../popup-message/popup-message.component";
import ContentSpinner from "../content-spinner/content-spinner.component";
import GalleryMenuButton from "../gallery-menu-button/gallery-menu-button.component";
import GalleryCategorized from "./sub-components/gallery-categorized.component";
import GalleryUncategorized from "./sub-components/gallery-uncategorized.component";

type PhotoGalleryProps = {
  generatePresentationFilename: () => string;
  display: string;
};

type FullScreenProps = {
  userId: number | undefined; // actually this would never be undefined, but i don't know how to enforce a type in a selector and it returns an optional undefined per default.
  fullscreenPicture: Picture;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  cloudinaryPicturesPath: string;
};

export type IsLoading = 'presentation' | 'upload' | 'delete' | null;

const globalContainer = document.getElementById(
  "globalContainer"
) as HTMLElement;


const PhotoGallery = ({ display, generatePresentationFilename }: PhotoGalleryProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();  
  const cloudinaryPicturesPath = `/inmobitas/u_${userId}/l_${listingid}/pictures`;
  const cloudRef = useRef(document.createElement('a'));

  const [ pictures, setPictures ] = useState<Picture[]>([]);
  const [ categories, setCategories ] = useState<PictureCategoryFromPayload[]>([]);

  const [ categorizedPictures, setCategorizedPictures ] = useState<PictureCategory[]>([]);
  const [ uncategorizedPictures, setUncategorizedPictures ] = useState<Picture[]>([]);

  const [ showCategoryDeleteBtn, setShowCategoryDeleteBtn ] = useState(false);

  const [fullscreenPicture, setFullscreenPicture] = useState<Picture | null>(null);
  const [showDeletionMenu, setShowDeletionMenu] = useState(false);
  const [markedPictures, setMarkedPictures] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<IsLoading>(null);
  const { t } = useTranslation(['ui', 'listing']);
  const [noImages, setNoImages] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const galleryHeight = useRelativeHeight(galleryRef);
  const { windowInnerWidth } = useWindowDimensions();

  // useEffect(() => { console.log('categories: ', categories) }, [categories])

  useEffect(() => {
    try {
      (async function () {
        const { data: picturesData } = await http.get<Picture[]>(
          `/pictures/${userId}/${listingid}`
        );

        const { data: categoriesData } = await http.get<PictureCategoryFromPayload[]>(
          `/categories/${userId}/${listingid}`
        );
        // console.log('categoriesData: ', categoriesData);

        setPictures(picturesData)
        setCategories(categoriesData)
      })();
    } catch (err) {
      console.error(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const categorized = categories.map(c => {
      const categoryPictures = pictures.filter(p => p.categoryId === c.categoryId)
      return { 
        categoryId: c.categoryId, 
        name: c.name,
        position: c.position, 
        categoryPictures, 
      }
    });
    console.log('categorized: ', categorized);

    const uncategorized = pictures.filter(p => !p.categoryId);
    console.log('uncategorized: ', uncategorized);

    setCategorizedPictures(categorized)
    setUncategorizedPictures(uncategorized)
  }, [ pictures, categories ])

  useEffect(() => { console.log('pictures: ', pictures); }, [ pictures ])

  // const onUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
  //   setIsLoading('upload');
  //   const filesToUpload = e.target.files ? [...e.target.files] : [];
  //   try {
  //     await http.get(`/checkverified/${userId}/${listingid}/${filesToUpload.length}`);
  //     const uploadedFiles = await Promise.all(
  //       filesToUpload.map((file: File) => {
  //         let formData = new FormData();
  //         formData.append("file", file);
  //         return http.post(`/pictures/${userId}/${listingid}`, formData);
  //       })
  //     );
  //     console.log(uploadedFiles);      
  //     setFiles([...files, ...uploadedFiles.map((file) => file.data)]);
  //     setNoImages(false)
  //     setIsLoading(null);
  //   } catch (err) {
  //     setIsLoading(null);
  //     if (err instanceof Error) {
  //       function isAxiosError (err: Error | AxiosError): err is AxiosError {
  //         return (err as AxiosError).isAxiosError !== undefined;
  //       }
  //       if (isAxiosError(err) && err.response) {
  //         toaster.warning(err.response.data.unverifiedUserError.errorMessage, {
  //           description: err.response.data.unverifiedUserError.errorMessageDescription,
  //           duration: 7
  //         });
  //       }
  //     } else {
  //       console.error(err);
  //     }
  //   }
  // };

  const toggleMark = (pictureIdToDelete: number): void => {
    const picture = markedPictures.find(
      (pictureId) => pictureId === pictureIdToDelete
    );
    if (picture) {
      const filteredPictures = markedPictures.filter(
        (pictureId) => pictureId !== pictureIdToDelete
      );
      setMarkedPictures(filteredPictures);
      return;
    }
    setMarkedPictures([...markedPictures, pictureIdToDelete]);
  };

  const submitDeletion = async (): Promise<void> => {
    setIsLoading('delete');
    const res = await Promise.all(
      markedPictures.map((pictureId) => {
        const deletedPicture = http.delete<number>(
          `/pictures/${userId}/${listingid}/${pictureId}`
        );
        return deletedPicture;
      })
    );
    const deletedPictures = res.map((deletedPicture) => deletedPicture.data);
    const remaningPictures = pictures.filter(
      (pic) => !deletedPictures.some((dPic) => dPic === pic.pictureId)
    );
    
    setPictures(remaningPictures);
    setShowDeletionMenu(false);
    setMarkedPictures([]);
    setIsLoading(null);
  };

  const generatePresentation = async () => {
    if (pictures.length || generatePresentationFilename !== undefined) {
      setIsLoading('presentation');
      const res = await http.get(`/presentations/${userId}/${listingid}`, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      cloudRef.current.setAttribute('href', url);
      cloudRef.current.setAttribute('download', generatePresentationFilename());
      cloudRef.current.click()
      setIsLoading(null);      
    } else {
      setNoImages(true);
      setTimeout(() => {
        setNoImages(false);
      }, 2000);
    }
  }

  const createNewCategory = async () => {
    try {
      const categoryObj = {
        name: '',
        position: categories.length
      };

      const { data: newCategory } = await http.post<PictureCategoryFromPayload>(
        `/categories/${userId}/${listingid}`, 
        categoryObj
      );

      setCategories(prev => [ ...prev, { ...newCategory, categoryPictures: [] } ])
    } catch (err) {
      console.error(`there was an error trying to create a category: ${err}`)
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await http.delete(`/categories/${userId}/${listingid}/${categoryId}`);
      const remainingCategories = categories.filter(c => c.categoryId !== categoryId);

      setCategories(remainingCategories)
    } catch (err) {
      console.error(`there was an error trying to delete a category: ${err}`)
    }
  };

  return (
    <>
      <DeletionPanel
        showDeletionMenu={showDeletionMenu}
        setShowDeletionMenu={setShowDeletionMenu}
        setMarkedPictures={setMarkedPictures}
        submitDeletion={submitDeletion}
      />        
      <Pane 
        ref={galleryRef}
        height={galleryHeight}
        display={display}
        position={"relative"}
        overflow={'scroll'}
      >
        <PopupMessage message={ t('noImages') } displayCondition={noImages}/>
        <Pane position="relative">
          { isLoading && 
            <ContentSpinner
              waitMessage={
                isLoading === 'presentation' ? t('waitForPresentation') :
                isLoading === 'upload' ? t('waitForPictureUpload') :
                isLoading === 'delete' ? t('waitForPictureDelete') : ''
              }
              zIndex={20}
            /> 
          }
          { 
            categorizedPictures.map((c, idx) => (
              <GalleryCategorized 
                key={ `category-${idx}` }
                name={ c.name }
                categoryId={ c.categoryId }
                categoryPictures={ c.categoryPictures }
                deleteCategory={ deleteCategory }
                setPictures={ setPictures }
                setCategories={ setCategories }
                showCategoryDeleteBtn={ showCategoryDeleteBtn }
                setShowCategoryDeleteBtn={ setShowCategoryDeleteBtn }
                showDeletionMenu={ showDeletionMenu }
                setShowDeletionMenu={ setShowDeletionMenu }
                markedPictures={ markedPictures }
                toggleMark={ toggleMark }
                setFullscreenPicture={ setFullscreenPicture }
                setIsLoading={ setIsLoading }
              />
            ))
          }
          { uncategorizedPictures.length ? 
            <GalleryUncategorized 
              categoryPictures={ uncategorizedPictures }
              setPictures={ setPictures }
              showDeletionMenu={ showDeletionMenu }
              setShowDeletionMenu={ setShowDeletionMenu }
              markedPictures={ markedPictures }
              toggleMark={ toggleMark }
              setFullscreenPicture={ setFullscreenPicture }
              setIsLoading={ setIsLoading }
            /> : ''
          }
        </Pane>
        {fullscreenPicture && globalContainer ? (
          <FullScreen
            userId={userId}
            fullscreenPicture={fullscreenPicture}
            setFullscreenPicture={setFullscreenPicture}
            cloudinaryPicturesPath={cloudinaryPicturesPath} 
          />
        ) : (
          ""
        )}
      </Pane>
      <GalleryMenu
        width={windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? DESKTOP_BREAKPOINT_VALUE : undefined}
        showDeletionMenu={showDeletionMenu}
      >
        <GalleryMenuButton 
          Icon={DocumentIcon}
          fn={generatePresentation}
        />
        <GalleryMenuButton 
          Icon={FolderNewIcon}
          fn={createNewCategory}
        />
        { windowInnerWidth > DESKTOP_BREAKPOINT_VALUE &&
          <GalleryMenuButton Icon={TrashIcon} fn={() => setShowDeletionMenu(!showDeletionMenu)}/>
        }
      </GalleryMenu>
    </>
  );
};

const FullScreen = ({
  userId,
  fullscreenPicture,
  setFullscreenPicture,
  cloudinaryPicturesPath,
}: FullScreenProps) =>
  ReactDOM.createPortal(
    <Pane
      position={"fixed"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      top={0}
      left={0}
      zIndex={9999}
    >
      <Pane position={"absolute"} zIndex={99}>
        <img
          alt=""
          crossOrigin="anonymous"
          src={fullscreenPicture.largeSizeUrl}
        />
      </Pane>
      <Pane
        width={"100vw"}
        height={"100vh"}
        backgroundColor={"black"}
        position={"absolute"}
        zIndex={98}
        cursor={"pointer"}
        onClick={() => setFullscreenPicture(null)}
      ></Pane>
    </Pane>,
    globalContainer
  );


export default PhotoGallery;
