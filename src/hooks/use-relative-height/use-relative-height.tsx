import { useState, useEffect, RefObject } from 'react';

const useComponentHeight = (ref: RefObject<HTMLDivElement>, extraSpace?: number): number | undefined => {

  const [componentHeight, setComponentHeight] = useState<number>();
  const calculateRelativeHeight = () => {
    let height = 0;
    if (ref?.current) height = window.innerHeight - ref.current?.offsetTop - 1;
    if (extraSpace) height -= extraSpace;
    console.log('window height: ', window.innerHeight);
    console.log('component offsetTop: ', ref.current?.offsetTop);
    console.log('new height: ', height);
    setComponentHeight(height);
  }

  useEffect(() => {
    calculateRelativeHeight();
    window.addEventListener('resize', calculateRelativeHeight);
    return () => window.removeEventListener('resize', calculateRelativeHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return componentHeight;
}

export default useComponentHeight;
