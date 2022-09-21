import { useState, useEffect, MutableRefObject } from 'react';

const paginationSpace = 70;

const useRelativeHeight = (ref: MutableRefObject<HTMLDivElement | undefined | null>, extraSpace?: number): number | undefined => {

  const [componentHeight, setComponentHeight] = useState<number>();
  const calculateRelativeHeight = () => {
    if (ref?.current) {
      let height = 0;
      height = window.innerHeight - ref.current?.offsetTop - 1;
      if (extraSpace) height -= extraSpace;
      setComponentHeight(height - paginationSpace);
    } 
  }

  useEffect(() => {
    calculateRelativeHeight();
    window.addEventListener('resize', calculateRelativeHeight);
    return () => window.removeEventListener('resize', calculateRelativeHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calculateRelativeHeight();
  }, [ref.current?.offsetTop])

  return componentHeight;
}

export default useRelativeHeight;
