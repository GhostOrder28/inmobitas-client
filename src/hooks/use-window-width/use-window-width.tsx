import { useEffect, useState, useRef } from 'react';
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    });
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    }
  }, []);

  return windowWidth;
}

export default useWindowWidth;
