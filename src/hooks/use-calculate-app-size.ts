import { useState, useEffect } from "react";
import useMediaQuery from "@custom-react-hooks/use-media-query";

import useWindowDimensions from "./use-window-dimensions";
import { DESKTOP_BREAKPOINT_VALUE } from "../constants/breakpoints.consts";
import { DESKTOP_VIEW_WIDTH, DEFAULT_WIDTH, NAVBAR_HEIGHT } from "../constants/sizes.consts";

const useCalculateAppSize = (): [ string | number, number ] => {
  const { windowInnerWidth, windowInnerHeight } = useWindowDimensions();
  const [ appWidth, setAppWidth ] = useState<number | string>("100%");
  const [ appHeight, setAppHeight ] = useState<number>(0);
  const isDesktop = useMediaQuery(`(min-width: ${ DESKTOP_BREAKPOINT_VALUE }px)`);
  // const isTablet = useMediaQuery("(min-width:768px)");
  // const isMobile = useMediaQuery("(min-width:480px)");
  
  useEffect(() => {
    if (isDesktop) {
      setAppWidth(DESKTOP_VIEW_WIDTH)
    } else {
      setAppWidth(DEFAULT_WIDTH)
    };
  }, [ windowInnerWidth ])

  useEffect(() => {
    setAppHeight(windowInnerHeight - NAVBAR_HEIGHT)
  }, [ windowInnerHeight ])

  return [ appWidth, appHeight ];
}

export default useCalculateAppSize;
