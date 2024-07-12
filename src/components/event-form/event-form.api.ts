import { Dispatch, SetStateAction } from "react";
import { ValidationError } from "../../http/http.types";
import axios, { AxiosError } from "axios";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";
import http from "../../http/http";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { HTTPErrorData } from "../../http/http.types";
import { UseFormSetError } from "react-hook-form";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";
import { compareAsc } from "date-fns";

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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw new Error(`there is an error but it doesn't have a response: ${err}`);

      const errorData: HTTPErrorData = err.response.data;

      if (errorData.validationErrors) {
        handleValidationErrors<AgendaEvent>(eventData, errorData.validationErrors, setError); 
      } else {
        throw errorData;
      }
    } else {
      console.error(err)
    };
    // setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
  }
};

export {
  onSubmitEventData,
}
