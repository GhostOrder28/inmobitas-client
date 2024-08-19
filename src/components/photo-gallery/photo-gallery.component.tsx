import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { 
  Pane, 
  TrashIcon,
  FolderNewIcon,
  DocumentIcon,
  CrossIcon,
  Button,
  Text,
  useTheme,
  minorScale,
  majorScale,
} from "evergreen-ui";
import { useTranslation } from "react-i18next";

import useRelativeHeight from "../../hooks/use-relative-height";
import useWindowDimensions from "../../hooks/use-window-dimensions";

import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";
import http from "../../http/http";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import GalleryMenu from "../gallery-menu/gallery-menu.component";
import InnerMenu from "../inner-menu/inner-menu.component";
import "./photo-gallery.styles.css";
import { Picture, PictureCategory, PictureCategoryFromPayload } from "../listing-info/listing-info.types";
import PopupMessage from "../popup-message/popup-message.component";
import GalleryMenuButton from "../gallery-menu-button/gallery-menu-button.component";
import GalleryCategory from "./components/gallery-category/gallery-category.component";
import GalleryUncategorized from "./components/gallery-uncategorized/gallery-uncategorized.component";
import GalleryCategoryButton from "./components/gallery-category-button/gallery-category-button.component";
import ModalContainer from "../modal-container/modal-container.component";
import { checkPositions, sortEntities } from "../../utils/utility-functions/utility-functions";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { setIsLoading, unsetIsLoading } from "../../redux/app/app.actions";

type FullScreenProps = {
  userId: number | undefined; // actually this would never be undefined, but i don"t know how to enforce a type in a selector and it returns an optional undefined per default.
  fullscreenPicture: Picture;
  setFullscreenPicture: Dispatch<SetStateAction<Picture | null>>;
  cloudinaryPicturesPath: string;
};

export type IsLoading = "presentation" | "upload" | "deletePictures" | "deleteCategories" | null;
export type MenuMode = "pictures" | "categories" | null;

const globalContainer = document.getElementById(
  "globalContainer"
) as HTMLElement;

const attachPicturesToCategory = (categories: PictureCategoryFromPayload[], pictures: Picture[]) => {
  return categories.map(c => {
    const categoryPictures = pictures.filter(p => p.categoryId === c.categoryId)
    return { 
      ...c,
      categoryPictures, 
    }
  });
};

const PhotoGallery = () => {
  const userId = useSelector(selectCurrentUserId);
  const { estateId } = useParams();  
  const cloudinaryPicturesPath = `/inmobitas/u_${userId}/l_${estateId}/pictures`;
  const cloudRef = useRef(document.createElement("a"));

  const [ menuMode, setMenuMode ] = useState<MenuMode>(null);
  const [ markedItems, setMarkedItems ] = useState<number[]>([]);

  const [ pictures, setPictures ] = useState<Picture[]>([]);

  const [ categories, setCategories ] = useState<PictureCategoryFromPayload[]>([]);
  const [ categorizedPictures, setCategorizedPictures ] = useState<PictureCategory[]>([]);
  const [ uncategorizedPictures, setUncategorizedPictures ] = useState<Picture[]>([]);
  const [ showCategoryDeletionWarning, setShowCategoryDeletionWarning ] = useState<boolean>(false);

  const [ fullscreenPicture, setFullscreenPicture ] = useState<Picture | null>(null);

  const { t } = useTranslation(["ui", "listing"]);
  const [noImages, setNoImages] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const galleryHeight = useRelativeHeight(galleryRef);
  const { windowInnerWidth } = useWindowDimensions();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  // useEffect(() => { console.log("categories: ", categories) }, [categories])

  useEffect(() => {
    try {
      (async function () {
        console.log('fetching pictures...');
        const { data: picturesData } = await http.get<Picture[]>(
          `/pictures/${userId}/${estateId}`
        );

        const { data: categoriesData } = await http.get<PictureCategoryFromPayload[]>(
          `/categories/${userId}/${estateId}`
        );

        console.log('categoriesData: ', categoriesData);
        setPictures(picturesData)
        setCategories(categoriesData)
      })();
    } catch (err) {
      console.error(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pictures.length) return;

    const orderedPictures = sortEntities(pictures, "categoryId");

    const groupedCategories = groupCategories(orderedPictures);

    const orderedPicturesInsideCategories = groupedCategories.map(cat => {
      const ordered = sortEntities(cat.pictures, "picturePosition");
      return { ...cat, pictures: ordered }
    });

    const categoriesWithBadPicturesPositions = orderedPicturesInsideCategories.filter(cat => {
      const positionsCorrect = checkPositions(cat.pictures, "picturePosition");
      return !positionsCorrect;
    }).map(c => c.categoryId);

    if (categoriesWithBadPicturesPositions.length) {
      (async function () {
        const updatedPictures = await updatePicturesPosition(categoriesWithBadPicturesPositions)

        const stateNewPictures = pictures.map(p => {
          const updatedPicture = updatedPictures.find(up => p.pictureId === up.pictureId);
          return updatedPicture || p
        });

        setPictures(stateNewPictures);
      })();
    };

  }, [ pictures ])

  useEffect(() => {
    const orderedCategories = sortEntities(categories, "categoryPosition");
    console.log("orderedCategories: ", orderedCategories);

    if (categories.length) {
      const categoriesPositionsCorrect = checkPositions(orderedCategories, "categoryPosition");
      console.log("categoriesPositionsCorrect: ", categoriesPositionsCorrect);

      if (!categoriesPositionsCorrect) {
        (async function () {
          const updatedCategories = await updateCategoriesPosition()
          setCategories(updatedCategories);
        })();
      };
    } 

    const categorized = attachPicturesToCategory(orderedCategories, pictures);
    console.log("categorized: ", categorized);

    const uncategorized = pictures.filter(p => !p.categoryId);

    setCategorizedPictures(categorized)
    setUncategorizedPictures(uncategorized)
  }, [ categories, pictures ])

  const toggleMark = (currentId: number): void => {
    const entityExists = markedItems.some(
      (entityId) => entityId === currentId
    );

    if (entityExists) {
      const filteredEntities = markedItems.filter(
        (entityId) => entityId !== currentId
      );
      setMarkedItems(filteredEntities);
      return;
    }
    setMarkedItems(prev => [ ...prev, currentId ]);
  };

  const submitDeletion = async (entity: Exclude<MenuMode, null>): Promise<void> => {
    if (entity === "pictures") {
      dispatch(setIsLoading(t("waitForPictureDelete")))
    } else {
      dispatch(setIsLoading(t("waitForCategoryDelete")))
    };

    const res = await Promise.all(
      markedItems.map(id => {
        const deletedEntity = http.delete<number>(
          `/${entity}/${userId}/${estateId}/${id}`
        );
        return deletedEntity;
      })
    );

    const deletedEntities = res.map((deletedEntity) => deletedEntity.data);

    if (entity === "pictures") {
      const picturesWithoutDeleted = pictures.filter(p => !deletedEntities.some(de => p.pictureId === de));
      setPictures(picturesWithoutDeleted);
    };

    if (entity === "categories") {
      const categoriesWithoutDeleted = categories.filter(c => !deletedEntities.some(de => c.categoryId === de));
      setCategories(categoriesWithoutDeleted);
    };

    setMenuMode(null);
    setMarkedItems([]);
    dispatch(unsetIsLoading())
  };

  const groupCategories = (orderedEntities: Picture[]) => {
    return orderedEntities.reduce<({categoryId: number | undefined, pictures: Picture[]})[]>((acc, curr, idx, arr) => {
      const isFirst = idx === 0;
      if (isFirst) return [ ...acc, { categoryId: curr.categoryId, pictures: [ curr ] } ];

      const lastCat = acc[ acc.length - 1 ];
      const lastCatLastItem = lastCat.pictures[lastCat.pictures.length - 1];
      if (lastCatLastItem.categoryId === curr.categoryId) {
        const withoutLastCat = acc.slice(0, acc.length - 1)
        lastCat.pictures.push(curr)
        return [ ...withoutLastCat, lastCat ]
      };

      return [ ...acc, { categoryId: curr.categoryId, pictures: [ curr ] } ];

    }, []);
  };

  const updateCategoriesPosition = async () => {
    const { data: { updatedCategories } } = await http.patch(`/categories/${estateId}?update=true`);
    return updatedCategories;
  };

  const updatePicturesPosition = async (categoriesToUpdate: (number | undefined)[]) => {
    const queryString = categoriesToUpdate.map(cid => {
      return `categories=${cid}`
    }).join("&");

    const {
      data: {
        updatedPictures 
      } 
    } = await http.patch<{ updatedPictures: Picture[] }>(`/pictures/${userId}/${estateId}?${queryString}`);

    return updatedPictures;
  };

  const generatePresentation = async () => {
    try {
      if (pictures.length) {
        dispatch(setIsLoading(t("waitForPresentation")))
        const res = await http.get(`/presentations/${userId}/${estateId}`, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/pdf"
          }
        });
        const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        cloudRef.current.setAttribute("href", url);
        cloudRef.current.setAttribute("download", "temp_name.pdf");
        cloudRef.current.click()
        dispatch(unsetIsLoading())
      } else {
        setNoImages(true);
        setTimeout(() => {
          setNoImages(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err)
    }
  }

  // const generatePresentationFilename = () => {
  //   const now = new Date();
  //   const date = format(now, "P").replaceAll('/', '-');
  //   const timestamp = format(now, "t");
  //   if (listing) {
  //     console.log('listing: ', listing);
  //     // // this whole process to get the district and neighborhood data is not really good, I need to find a better way to get that data
  //     // const locationData = listingSpecifications[listingSpecifications.length - 2];
  //     // console.log(locationData)
  //     // // WARNING: District and Neighborhood are capitalized because they are being extracted from the returned grouped listing array, these are used as labels and that"s why they are capitalized.
  //     // const [district, neighborhood] = locationData.items.filter(item => item.label === "District" || item.label === 'Neighborhood');
  //     // return strParseIn(`${district.value}_${neighborhood.value ? neighborhood.value + "_" : ''}presentation_${date}_${timestamp}.pdf`);
  //   }
  //   return `presentation_${date}_${timestamp}.pdf` ;
  // }

  const createNewCategory = async () => {
    try {
      const categoryObj = {
        name: "",
        categoryPosition: categories.length + 1
      };

      const { data: newCategory } = await http.post<PictureCategoryFromPayload>(
        `/categories/${userId}/${estateId}`, 
        categoryObj
      );

      setCategories(prev => [ ...prev, { ...newCategory, categoryPictures: [], newlyCreated: true } ])
    } catch (err) {
      console.error(`there was an error trying to create a category: ${err}`)
    }
  };

  return (
    <>
      <InnerMenu entity="pictures" menuMode={ menuMode }>
        <GalleryCategoryButton
          onClick={ markedItems.length ? () => submitDeletion("pictures") : undefined }
          icon={ TrashIcon }
          borderColor={ colors.gray500 }
          size={ majorScale(6) }
        />
        <GalleryCategoryButton
          icon={ CrossIcon }
          onClick={ () => {
            setMenuMode(null);
            setMarkedItems([]);
          } }
          color={ colors.red500 }
          borderColor={ colors.gray500 }
          size={ majorScale(6) }
        />
      </InnerMenu>
      <InnerMenu entity="categories" menuMode={ menuMode }>
        <GalleryCategoryButton
          onClick={ markedItems.length ? () => setShowCategoryDeletionWarning(true) : undefined }
          icon={ TrashIcon }
          borderColor={ colors.gray500 }
          size={ majorScale(6) }
        />
        <GalleryCategoryButton
          icon={ CrossIcon }
          onClick={ () => {
            setMenuMode(null);
            setMarkedItems([]);
          } }
          color={ colors.red500 }
          borderColor={ colors.gray500 }
          size={ majorScale(6) }
        />
      </InnerMenu>
      <Pane 
        ref={galleryRef}
        height={galleryHeight}
        // display={display}
        position={"relative"}
        overflow={"scroll"}
      >
        <PopupMessage message={ t("noImages") } displayCondition={noImages}/>
        <Pane position="relative">
          { 
            categorizedPictures.map((c, idx) => (
              <GalleryCategory
                key={ `category-${c.categoryId}` }
                categoryId={ c.categoryId }
                name={ c.name }
                position={ idx + 1 } // index is zero-based, position is one-based
                categoryPictures={ c.categoryPictures }
                newlyCreated={ c.newlyCreated }

                menuMode={ menuMode }
                markedItems={ markedItems }
                toggleMark={ toggleMark }

                setMenuMode={ setMenuMode }
                setPictures={ setPictures }
                setCategories={ setCategories }
                setFullscreenPicture={ setFullscreenPicture }
              />
            ))
          }
          <GalleryUncategorized 
            categoryPictures={ uncategorizedPictures }
            toggleMark={ toggleMark }
            menuMode={ menuMode }
            markedItems={ markedItems }
            setPictures={ setPictures }
            setFullscreenPicture={ setFullscreenPicture }
            setMenuMode={ setMenuMode }
          />
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
        menuMode={menuMode}
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
          <GalleryMenuButton Icon={TrashIcon} fn={() => setMenuMode("pictures")}/>
        }
      </GalleryMenu>
      { showCategoryDeletionWarning ?
        <ModalContainer 
          hideFn={ () => setShowCategoryDeletionWarning(false) }
        >
          <Pane 
            display="flex"
            flexDirection="column"
            gap={ minorScale(4) }
            padding={ minorScale(5) }
          >
            <Pane>
              <Text display="flex" justifyContent="center" size={600}>{ t("categoryDeletionYerOrNo", { ns: "ui" })}</Text>
              <Text display="flex" justifyContent="center" size={400}>{ t("picturesWillBeRemoved", { ns: "ui" }) }</Text>
            </Pane>
            <Pane
              display="flex"
              gap={ minorScale(4) }
            >
              <Button 
                intent="success" 
                flex={1}
                onClick={ () => { 
                  setMenuMode(null);
                  setShowCategoryDeletionWarning(false);
                  submitDeletion("categories")
                } }
              >
                { t("yesDeleteIt", { ns: "ui" }) }
              </Button>
              <Button 
                intent="danger" 
                flex={1}
                onClick={ () => setShowCategoryDeletionWarning(false) }
              >
                { t("cancel", { ns: "ui" }) }
              </Button>
            </Pane>
          </Pane>
        </ModalContainer> : ""
      }
    </>
  );
};

const FullScreen = ({
  fullscreenPicture,
  setFullscreenPicture,
}: FullScreenProps) =>
  ReactDOM.createPortal(
    <Pane
      position="fixed"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
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
        width="100vw"
        height="100vh"
        backgroundColor="black"
        position="absolute"
        zIndex={98}
        cursor="pointer"
        onClick={() => setFullscreenPicture(null)}
      ></Pane>
    </Pane>,
    globalContainer
  );


export default PhotoGallery;
