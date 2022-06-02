import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { AxiosResponse } from 'axios';
import http from "../../utils/axios-instance";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { Pane, Spinner, Checkbox } from "evergreen-ui";
import FilesUploader from "../files-uploader/files-uploader.component";
import GalleryMenu from "../gallery-menu/gallery-menu.component";
import DeletionPanel from "../deletion-panel/deletion-panel.component";
import "./photo-gallery.styles.css";
import { Picture } from "../listing-detail/listing-detail.types";

const globalContainer = document.getElementById(
  "globalContainer"
) as HTMLElement;
const uploadUrl = 'https://res.cloudinary.com/ghost-order/image/upload/v1652147466';

const PhotoGallery = ({ display, listingPictures }: PhotoGalleryProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();  
  const cloudinaryPicturesPath = `/inmobitas/u_${userId}/l_${listingid}/pictures`;
  const cloudRef = useRef(document.createElement('a'));

  const [fullscreenPicture, setFullscreenPicture] = useState<Picture | null>(null);
  const [files, setFiles] = useState<Picture[]>([]);
  const [showDeletionMenu, setShowDeletionMenu] = useState(false);
  const [markedPictures, setMarkedPictures] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          `/deletepicture/${userId}/${listingid}/${pictureId}`
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
    await http.delete(`/deletedocument/${userId}/${listingid}`)
    setIsLoading(false);
  };

  const generatePresentation = async () => {
    setIsLoading(true);
    const res = await http.get(`/genpdf/${userId}/${listingid}`);
    console.log(res.data);
    cloudRef.current.setAttribute('href', res.data);
    console.log(cloudRef.current);

    cloudRef.current.click()

    setIsLoading(false);
  }

  return (
    <Pane display={display} position={"relative"}>
      <GalleryMenu
        setShowDeletionMenu={setShowDeletionMenu}
        showDeletionMenu={showDeletionMenu}
        generatePresentation={generatePresentation}
      >
        <FilesUploader
          files={files}
          setFiles={setFiles}
          setIsLoading={setIsLoading}
        />
        <DeletionPanel
          showDeletionMenu={showDeletionMenu}
          setShowDeletionMenu={setShowDeletionMenu}
          setMarkedPictures={setMarkedPictures}
          submitDeletion={submitDeletion}
        />        
      </GalleryMenu>
      <Pane position="relative">
        {isLoading && (
          <Pane
            display="flex"
            justifyContent="center"
            paddingTop="3rem"
            backgroundColor="white"
            opacity=".7"
            position="absolute"
            zIndex={60}
            width="100vw"
            height="100%"
          >
            <Spinner />
          </Pane>
        )}
        <Pane
          display="grid"
          gridTemplateColumns={"repeat(3, 1fr)"}
          position={"relative"}
          width={"100%"}
          padding={showDeletionMenu ? "1.5px" : ""}
          transition={"all .3s"}
        >
          {files.length
            ? files.map((file, idx) => {
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
                        />
                      )}
                      <img
                        className="gallery-img"
                        alt=""
                        src={file.smallSizeUrl}
                      />
                    </Pane>
                  </Pane>
                );
              })
            : ""}
        </Pane>
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

type PhotoGalleryProps = {
  display: string;
  listingPictures: Picture[];
};

type FullScreenProps = {
  userId: number | undefined; // actually this would never be undefined, but i don't know how to enforce a type in a selector and it returns an optional undefined per default.
  fullscreenPicture: Picture;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  cloudinaryPicturesPath: string;
};

export default PhotoGallery;
