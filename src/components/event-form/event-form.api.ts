import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";
import http from "../../http/http";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { UseFormSetError } from "react-hook-form";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";
import { compareAsc } from "date-fns";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;

const onSubmitEventData = async (
  eventData: AgendaEvent,
  setEvents: Dispatch<SetStateAction<AgendaEvent[]>>,
  setError: UseFormSetError<AgendaEvent>
) => {
  try {
    const { eventId, ...rest } = eventData;
    const eventDataWithoutId = rest;
    const userId = selectCurrentUserId(store.getState());
    const { data } = eventData?.eventId ? 
      await http.put<AgendaEvent>(`/events/${userId}/${eventData.eventId}`, eventDataWithoutId) :
      await http.post<AgendaEvent>(`/events/${userId}`, eventDataWithoutId);

    const eventPayload = {
      ...data,
      startDate: new Date (data.startDate),
      endDate: new Date (data.endDate || data.startDate),
    }

    if (eventId) {
      setEvents(prev => {
        const newVal = prev.map(evt => evt.eventId === eventId ? eventPayload : evt);
        const newValSorted = newVal.sort((a, b) => compareAsc(a.startDate, b.startDate));
        return newValSorted;
      })
    } else {
      setEvents(prev => [ ...prev, eventPayload ])
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) return console.error(t("nonAxiosError", { ns: 'error' }), error);

    const { data: { validationErrors } } = error.response!!;
    handleValidationErrors<AgendaEvent>(eventData, validationErrors, setError); 
  }
};

export {
  onSubmitEventData,
}
