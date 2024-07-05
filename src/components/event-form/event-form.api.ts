import { Dispatch, SetStateAction } from "react";
import { ValidationError } from "../../http/http.types";
import axios, { AxiosError } from "axios";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";
import { EventFormData } from "./event-form.types";
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
  currentEvent: AgendaEvent | undefined,
  setCurrentEvent: Dispatch<SetStateAction<AgendaEvent | undefined>>,
  setDisplayEventForm: Dispatch<SetStateAction<boolean>>,
  setError: UseFormSetError<AgendaEvent>
) => {
  try {
    const { eventId, ...rest } = eventData;
    const eventDataWithoutId = rest;
    const userId = selectCurrentUserId(store.getState());
    const { data } = currentEvent ? 
      await http.put<AgendaEvent>(`/events/${userId}/${currentEvent.eventId}`, eventDataWithoutId) :
      await http.post<AgendaEvent>(`/events/${userId}`, eventData);

    console.log(data)
    const eventPayload = {
      ...data,
      startDate: new Date (data.startDate),
      endDate: new Date (data.endDate || data.startDate),
    }

    setEvents((prev) => {
      let arr = null;
      if (currentEvent) {
        setCurrentEvent(undefined);
        const remainingEvents = prev.filter(event => event.eventId !== eventPayload.eventId);
        arr = [...remainingEvents, eventPayload];
      } else {
        arr = [...prev, eventPayload];
      }
      arr.sort((a, b) => compareAsc(a.startDate, b.startDate));
      return arr;
    })
    setDisplayEventForm(false)
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
