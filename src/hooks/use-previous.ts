import { useRef, useEffect } from "react";

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value])
  return ref.current;
}

export default usePrevious;