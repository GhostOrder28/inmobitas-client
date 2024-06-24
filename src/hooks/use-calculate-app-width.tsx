import { useState, useEffect } from "react";

import useWindowDimensions from "./use-window-dimensions";
import { DESKTOP_BREAKPOINT_VALUE } from "../constants/breakpoints.constants";

const useCalculateAppWidth = () => {
  const { windowInnerWidth } = useWindowDimensions();
  const [ appWidth, setAppWidth ] = useState<number | string>('100%');
  
  useEffect(() => {
    setAppWidth(windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? 600 : '100%')
  }, [])

  return appWidth;
}

export default useCalculateAppWidth;
