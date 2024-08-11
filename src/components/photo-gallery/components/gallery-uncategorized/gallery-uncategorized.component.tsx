import { useRef } from "react";
import {
  Pane,
  Checkbox, 
  Text, 
  ArrowUpIcon,
  majorScale,
  minorScale,
  useTheme,
} from "evergreen-ui";
import { useTranslation } from "react-i18next";
import { Uncategorized } from "../gallery-category.types";
import { useParams } from "react-router-dom";
import GalleryCategoryButton from "../gallery-category-button/gallery-category-button.component";
import { onUpload } from "./gallery-uncategorized.api";
import "../gallery-category.styles.css";

const GalleryUncategorized = ({ 
  categoryPictures, 
  menuMode,
  markedItems,
  toggleMark, 
  setFullscreenPicture, 
  setPictures,
  setMenuMode,
}: Uncategorized) => {
  const timeout = useRef<NodeJS.Timeout>();
  const { listingId } = useParams();
  const { t } = useTranslation(["listing"]);
  const { colors } = useTheme();

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
          <Text fontStyle="italic">{ t('uncategorized') }</Text>
        </Pane>
        <Pane display="flex">
          <GalleryCategoryButton 
            borderColor={ colors.gray500 }
            size={ majorScale(6) }
            upload={
              <Pane>
                <input
                  id={ `upload-btn-uncategorized` }
                  className="upload-btn"
                  type="file"
                  onChange={(e) => onUpload(e, Number(listingId!!), setPictures, categoryPictures.length)}
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
        padding={menuMode === "pictures" && categoryPictures.length ? "1.5px" : ""}
        transition={"all .3s"}
      >
        {
          categoryPictures.map((file, idx) => {
            return (
              <Pane
                key={`image-${idx}`}
                className="gallery-img-container"
                position={"relative"}
                border={menuMode === "pictures" ? "3px solid white" : ""}
              >
                <Pane
                  top="0"
                  left="0"
                  cursor={"pointer"}
                  onClick={
                    menuMode === "pictures"
                      ? () => toggleMark(file.pictureId)
                      : () => setFullscreenPicture(file)
                  }
                  onTouchStart={() => {timeout.current = setTimeout(() => setMenuMode("pictures"), 500)}}
                  onTouchEnd={ () => clearTimeout(timeout.current) }
                  onTouchMove={() => clearTimeout(timeout.current)}
                >
                  {menuMode === "pictures" && (
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
                    crossOrigin="anonymous"
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
