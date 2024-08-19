import { useState, useEffect, MutableRefObject, FC } from "react";
import useWindowDimensions from "./use-window-dimensions";

const paginationSpace = 50;

type RelativeHeight = (
  ref: MutableRefObject<HTMLDivElement | undefined | null>,
  options?: RelativeHeightOptions
) => number | undefined;

type RelativeHeightOptions = {
  extraSpace?: number;
  ignorePaginationSpace?: boolean;
}

const useRelativeHeight: RelativeHeight = (ref, options) => {

  const [componentHeight, setComponentHeight] = useState<number>();
  const { windowInnerHeight } = useWindowDimensions();
  const calculateRelativeHeight = () => {
    if (ref?.current) {
      let height = 0;
      height = window.innerHeight - ref.current?.offsetTop - 1;
      if (options?.extraSpace) height -= options.extraSpace;

      if (options?.ignorePaginationSpace) {
        setComponentHeight(height);
      } else {
        setComponentHeight(height - paginationSpace);
      }
    } 
  }

  useEffect(() => {
    calculateRelativeHeight();
    // window.addEventListener("resize", calculateRelativeHeight);
    // return () => window.removeEventListener("resize", calculateRelativeHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ windowInnerHeight ]);

  useEffect(() => {
    calculateRelativeHeight();
  }, [ref.current?.offsetTop])

  return componentHeight;
}

export default useRelativeHeight;
