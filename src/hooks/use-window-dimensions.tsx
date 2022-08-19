import { useEffect, useState, useRef } from 'react'; 

type WindowDimensions = {
  windowInnerWidth: number;
  windowInnerHeight: number;
}

const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState<WindowDimensions>({ windowInnerWidth: window.innerWidth, windowInnerHeight: window.innerHeight });
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth({
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
      })
    });
    return () => {
    window.removeEventListener('resize', () => {
      setWindowWidth({
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
      })
    });
    }
  }, []);

  return windowWidth;
}

export default useWindowDimensions;
