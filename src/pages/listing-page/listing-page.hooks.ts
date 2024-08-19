import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { getPathLastFragment } from "../../utils/utility-functions/utility-functions";
import { INFO_TAB, GALLERY_TAB } from "./listing-page.consts";

type RT = [
  boolean,
  Dispatch<SetStateAction<boolean>>
]

const useTabDisplayer = (): RT => {
  const { pathname } = useLocation();
  const [ showTabs, setShowTabs ] = useState(true);

  useEffect(() => {
    const page = getPathLastFragment(pathname);
    if (page === "edit") {
      setShowTabs(false)
    } else {
      setShowTabs(true)
    };
  }, [ pathname ])

  return [
    showTabs,
    setShowTabs
  ]
};

const useSyncTabAndRoute = (setSelectedTab: Dispatch<SetStateAction<number>>) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pathname.slice(pathname.lastIndexOf("/") + 1);
    if (page === "gallery") {
      setSelectedTab(GALLERY_TAB)
    } else {
      setSelectedTab(INFO_TAB)
    };
  }, [ pathname ])
};

export {
  useTabDisplayer,
  useSyncTabAndRoute
}
