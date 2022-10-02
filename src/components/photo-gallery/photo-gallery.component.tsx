import React, { Dispatch, SetStateAction, useEffect, useState, useRef, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { 
  Pane, 
  Checkbox, 
  DocumentIcon,
  TrashIcon,
} from "evergreen-ui";
import { useTranslation } from "react-i18next";

import useRelativeHeight from '../../hooks/use-relative-height';
import useWindowDimensions from "../../hooks/use-window-dimensions";

import { desktopBreakpoint } from '../../constants/breakpoints.constants';
import http from "../../utils/axios-instance";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import FilesUploader from "../files-uploader/files-uploader.component";
import GalleryMenu from "../gallery-menu/gallery-menu.component";
import DeletionPanel from "../deletion-panel/deletion-panel.component";
import "./photo-gallery.styles.css";
import { Picture } from "../listing-detail/listing-detail.types";
import PopupMessage from "../popup-message/popup-message.component";
import ContentSpinner from "../content-spinner/content-spinner.component";
import PicturesContainer from '../pictures-container/pictures-container.component';
import GalleryMenuButton from "../gallery-menu-button/gallery-menu-button.component";

type PhotoGalleryProps = {
  generatePresentationFilename: () => string;
  display: string;
  listingPictures: Picture[];
};

type FullScreenProps = {
  userId: number | undefined; // actually this would never be undefined, but i don't know how to enforce a type in a selector and it returns an optional undefined per default.
  fullscreenPicture: Picture;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  cloudinaryPicturesPath: string;
};

const globalContainer = document.getElementById(
  "globalContainer"
) as HTMLElement;

const PhotoGallery = ({ display, listingPictures, generatePresentationFilename }: PhotoGalleryProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();  
  const cloudinaryPicturesPath = `/inmobitas/u_${userId}/l_${listingid}/pictures`;
  const cloudRef = useRef(document.createElement('a'));
  const timeout = useRef<NodeJS.Timeout>();

  const [fullscreenPicture, setFullscreenPicture] = useState<Picture | null>(null);
  const [files, setFiles] = useState<Picture[]>([]);
  const [showDeletionMenu, setShowDeletionMenu] = useState(false);
  const [markedPictures, setMarkedPictures] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation(['ui']);
  const [noImages, setNoImages] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const galleryHeight = useRelativeHeight(galleryRef);
  const { windowInnerWidth } = useWindowDimensions();

  useEffect(() => {
    setFiles([...listingPictures]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingPictures]);

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
    setIsLoading(true);
    const res = await Promise.all(
      markedPictures.map((pictureId) => {
        const deletedPicture = http.delete<number>(
          `/pictures/${userId}/${listingid}/${pictureId}`
        );
        return deletedPicture;
      })
    );
    const deletedPictures = res.map((deletedPicture) => deletedPicture.data);
    const remaningPictures = files.filter(
      (pic) => !deletedPictures.some((dPic) => dPic === pic.pictureId)
    );
    
    setFiles(remaningPictures);
    setShowDeletionMenu(false);
    setMarkedPictures([]);
    setIsLoading(false);
  };

  const generatePresentation = async () => {
    if (files.length || generatePresentationFilename !== undefined) {
      setIsLoading(true);
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
      setIsLoading(false);      
    } else {
      setNoImages(true);
      setTimeout(() => {
        setNoImages(false);
      }, 2000);
    }
  }

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
        <GalleryMenu
          width={windowInnerWidth > desktopBreakpoint ? desktopBreakpoint : undefined}
          showDeletionMenu={showDeletionMenu}
        >
          <GalleryMenuButton 
            Icon={DocumentIcon}
            fn={generatePresentation}
          />
          <FilesUploader
            files={files}
            setFiles={setFiles}
            setIsLoading={setIsLoading}
            setNoImages={setNoImages}
          />
          { windowInnerWidth > desktopBreakpoint &&
            <GalleryMenuButton Icon={TrashIcon} fn={() => setShowDeletionMenu(!showDeletionMenu)}/>
          }
        </GalleryMenu>
        <Pane position="relative">
          { isLoading && <ContentSpinner /> }
          { files.length ?
            <PicturesContainer showDeletionMenu={showDeletionMenu}>
              {
                files.map((file, idx) => {
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
                        zIndex={90}
                        cursor={"pointer"}
                        onClick={
                          showDeletionMenu
                            ? () => toggleMark(file.pictureId)
                            : () => setFullscreenPicture(file)
                        }
                        onContextMenu={(e: MouseEvent) => e.preventDefault()}
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
                          className={`gallery-img-${idx}`}
                          crossOrigin='anonymous'
                          alt=""
                          src={file.smallSizeUrl}
                        />
                      </Pane>
                    </Pane>
                  );
                })            
              }
            </PicturesContainer> : ""
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
