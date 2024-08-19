import { useEffect, useState, useCallback } from "react"; 

type WindowDimensions = {
  windowInnerWidth: number;
  windowInnerHeight: number;
}


const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({ windowInnerWidth: window.innerWidth, windowInnerHeight: window.innerHeight });

  const getWindowDimensions = useCallback(() => {
    setWindowDimensions({
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight
    })
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWindowDimensions);
    return () => {
    window.removeEventListener("resize", getWindowDimensions);
    }
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
