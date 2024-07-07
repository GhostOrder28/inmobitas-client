import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { useLocation } from "react-router-dom";

function useResetOnPathChange <T>(resetter: UseFormReset<T>, initialState: T) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/newlisting") {
      resetter(initialState)
    }
  }, [location.pathname]);
};

export {
  useResetOnPathChange
}
