import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AgendaEvent } from "../../agenda-page/agenda-page.types";
import { signOutStart, signOutWithError } from "../../../redux/user/user.actions";
import { getTodayEvents } from "../dashboard-page.api";

const useTodayEvents = () => {
  const dispatch = useDispatch();
  const [todayEvents, setTodayEvents] = useState<AgendaEvent[]>();
     
  useEffect(() => {
    (async function () {
      try {
        const todayEvents = await getTodayEvents();
        setTodayEvents(todayEvents)
      } catch (err) {
        console.error(err)
        dispatch(signOutWithError(err as Error))
      }
    })()
  }, [])

  return todayEvents
};

export default useTodayEvents
