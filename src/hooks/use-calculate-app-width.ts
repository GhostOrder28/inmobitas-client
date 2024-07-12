import { useState, useEffect } from "react";

import useWindowDimensions from "./use-window-dimensions";
import { DESKTOP_BREAKPOINT_VALUE } from "../constants/breakpoints.consts";
import { APP_WIDTH_FOR_DESKTOP_VIEW, APP_WIDTH_DEFAULT } from "../constants/sizes.consts";

const useCalculateAppWidth = () => {
  const { windowInnerWidth } = useWindowDimensions();
  const [ appWidth, setAppWidth ] = useState<number | string>('100%');
  
  useEffect(() => {
    setAppWidth(windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? APP_WIDTH_FOR_DESKTOP_VIEW : APP_WIDTH_DEFAULT)
  }, [])

  return appWidth;
}

export default useCalculateAppWidth;
