import { useState, useEffect, RefObject, useRef } from 'react';

const useRelativeHeight = (ref: RefObject<HTMLDivElement>, extraSpace?: number): number | undefined => {

  const [componentHeight, setComponentHeight] = useState<number>();
  const calculateRelativeHeight = () => {
    let height = 0;
    if (ref?.current) height = window.innerHeight - ref.current?.offsetTop - 1;
    //console.log('offsetTop: ', ref.current?.offsetTop)
    if (extraSpace) height -= extraSpace;
    //console.log('window inner height: ', window.innerHeight);
    //console.log('component offsetTop: ', ref.current?.offsetTop);
    //console.log('new height: ', height);
    setComponentHeight(height);
  }

  useEffect(() => {
    calculateRelativeHeight();
    window.addEventListener('resize', calculateRelativeHeight);
    return () => window.removeEventListener('resize', calculateRelativeHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //console.log('new offset top: ', ref.current?.offsetTop)
    calculateRelativeHeight();
    {/*console.log('window inner width: ', window.innerWidth)
    if (window.innerWidth > 992 ) {
      console.log('is greater than 992!')
      calculateRelativeHeight();
    }*/}
  }, [ref.current?.offsetTop])

  return componentHeight;
}

export default useRelativeHeight;
