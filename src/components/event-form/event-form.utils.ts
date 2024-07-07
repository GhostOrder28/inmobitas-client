import { useEffect } from "react";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";

function useInitializeEndDate (
  dependency: boolean, 
  setValue: UseFormSetValue<AgendaEvent>, 
  getValues: UseFormGetValues<AgendaEvent>
) {
  useEffect(() => {
    if (dependency) {
      setValue("endDate", getValues("startDate"))
    }
  }, [ dependency ])
};

export {
  useInitializeEndDate
}
