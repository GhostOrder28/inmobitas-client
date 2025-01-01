import http from "../../http/http";
import { AgendaEvent } from "../agenda-page/agenda-page.types";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

const getTodayEvents = async () => {
  try {
    const now = new Date();
    const userId = selectCurrentUserId(store.getState());

    const { data: eventData } = await http.get<AgendaEvent[]>(`/events/${userId}/${now}`);
    const parsedEventData = eventData.map((event: AgendaEvent) => ({
      ...event,
      startDate: new Date (event.startDate),
      ...event.endDate ? { endDate: new Date (event.endDate) } : {},
    }))

    return parsedEventData;
  } catch (err) {
    throw new Error(`error when getting today events: `, err as Error)
  }
}

export {
  getTodayEvents
}
