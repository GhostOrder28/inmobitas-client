import { useEffect, Dispatch, SetStateAction } from "react";

const useAutoHidePopup = (dependency: any, setter: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    setter(false)
  }, [ dependency ])
};

export default useAutoHidePopup;
