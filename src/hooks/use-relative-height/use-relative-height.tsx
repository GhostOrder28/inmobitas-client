import { useState, useEffect, RefObject } from 'react';

const useComponentHeight = (ref: RefObject<HTMLDivElement>, extraSpace?: number): number | undefined => {

  const [componentHeight, setComponentHeight] = useState<number>();
  function calculateRelativeHeight() {
    let height = 0;
    if (ref?.current) height = window.innerHeight - ref.current?.offsetTop - 1;
    if (extraSpace) height -= extraSpace;
    setComponentHeight(height);
  }

  useEffect(() => {
    window.addEventListener('resize', calculateRelativeHeight);
    return () => window.removeEventListener('resize', calculateRelativeHeight);
  }, []);

  useEffect(() => {
    calculateRelativeHeight();
  }, [ref.current]); // this effect is needed only because at the beginning the reference would be undefined

  return componentHeight;
}

export default useComponentHeight;
