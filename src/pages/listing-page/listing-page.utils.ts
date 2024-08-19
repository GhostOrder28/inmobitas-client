import { history } from "../..";
import { INFO_TAB, GALLERY_TAB } from "./listing-page.consts";

const handleNavigation = (
  selectedTab: number,
  currentTab: number,
) => {
  if (selectedTab === currentTab) return;
  const { pathname } = history.location;

  if (selectedTab === INFO_TAB) history.back();

  if (selectedTab === GALLERY_TAB) {
    const galleryPath = pathname.slice(0, pathname.lastIndexOf("/")) + "/gallery";
    history.push(galleryPath)
  };
};

export {
  handleNavigation
}
