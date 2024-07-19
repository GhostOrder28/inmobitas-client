import { useRef } from "react";

function useIsNew () {
  const ref = useRef(true);
  const isNew  = ref.current;
  ref.current = false;
  return isNew;
};

export {
  useIsNew,
}
