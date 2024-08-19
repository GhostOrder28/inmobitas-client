import { useState, useEffect, useRef } from "react";
import {
  Pane,
  Checkbox, 
  Strong,
  ArrowUpIcon,
  EditIcon,
  TickIcon,
  CrossIcon,
  useTheme,
  minorScale,
  majorScale,
} from "evergreen-ui";
import { Categorized } from "../gallery-category.types";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../gallery-category.styles.css";
import GalleryCategoryButton from "../gallery-category-button/gallery-category-button.component";
import useGenerateForm from "../../../../hooks/use-generate-form";
import { GALLERY_CATEGORY_FORM_INITIAL_STATE } from "./gallery-category.consts";
import { GalleryCategoryForm } from "./gallery-category.types";
import Input from "../../../input/input.component";
import { updateName } from "./gallery-category.api";
import { cancelUpdateName, useDetectNew } from "./gallery-category.utils";
import { onUpload } from "./gallery-category.api";

const GalleryCategory = ({ 
    categoryId,
    name, 
    categoryPictures, 
    newlyCreated,

    menuMode,
    markedItems,
    toggleMark, 

    setMenuMode,
    setPictures,
    setCategories,
    setFullscreenPicture, 
  }: Categorized) => {

  const [ editMode, setEditMode ] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout>();
  const categoryTouchTimeout = useRef<NodeJS.Timeout>();
  const { estateId } = useParams();
  const { t } = useTranslation(["error", "ui"]);
  const { colors } = useTheme();

  useDetectNew(Boolean(newlyCreated), setEditMode)

  const {
    handleSubmit, 
    setError, 
    reset,
    watch,
    inputCommonProps, 
  } = useGenerateForm<GalleryCategoryForm>(GALLERY_CATEGORY_FORM_INITIAL_STATE, { name });

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
          setMenuMode("categories")
        }, 500)} }
        onTouchEnd={ () => clearTimeout(categoryTouchTimeout.current) }
        onTouchMove={ () => clearTimeout(categoryTouchTimeout.current) }
        onClick={ menuMode === "categories" ? () => toggleMark(categoryId) : undefined }
        paddingRight={ menuMode === "categories" ? minorScale(3) : 0 }
        cursor={ menuMode === "categories" ? 'pointer' : 'default' }
      >
        <Pane 
          display="flex"
          width="100%" 
          paddingX={ minorScale(3) }
        >
          { editMode ? 
            <>
              <Input 
                name="name" 
                type="text" 
                placeholder={ t("categoryTitle", { ns: "client" }) } 
                border="none" 
                backgroundColor="transparent"
                autoFocus={ true }
                { ...inputCommonProps }
              />
            </> : 
            <Strong>
              { watch('name') }
            </Strong>
          }
        </Pane>
        <Pane display="flex">
          { !editMode && menuMode === null ? 
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
                      className="upload-btn"
                      type="file"
                      onChange={(e) => onUpload(e, Number(estateId!!), setPictures, categoryPictures.length, categoryId)}
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
            : ""
          }
          { editMode ?
            <>
              <GalleryCategoryButton
                icon={ TickIcon }
                color={ colors.green500 }
                onClick={ handleSubmit((formData) => updateName(formData, categoryId, setCategories, setEditMode, setError)) }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
              <GalleryCategoryButton
                icon={ CrossIcon }
                color={ colors.red500 }
                onClick={ () => cancelUpdateName(reset, setEditMode) }
                borderColor={ colors.gray500 }
                size={ majorScale(6) }
              />
            </> : ""
          }
          { menuMode === "categories" ?
            <Checkbox
              size={30}
              checked={ markedItems.some((id) => id === categoryId) }
              pointerEvents={"none"}
            />
            : ""
          }
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
                border={menuMode === "pictures" && categoryPictures.length ? "3px solid white" : ""}
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

export default GalleryCategory;
