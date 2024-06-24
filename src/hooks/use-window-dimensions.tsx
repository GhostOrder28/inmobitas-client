import { useEffect, useState } from 'react'; 

type WindowDimensions = {
  windowInnerWidth: number;
  windowInnerHeight: number;
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({ windowInnerWidth: window.innerWidth, windowInnerHeight: window.innerHeight });
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowDimensions({
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
      })
    });
    return () => {
    window.removeEventListener('resize', () => {
      setWindowDimensions({
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
      })
    });
    }
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
