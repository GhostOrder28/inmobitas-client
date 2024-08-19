import React, { useState, useEffect, useCallback, useRef, TouchEvent, useMemo } from "react";
import { 
  Pane, 
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  TableHeaderCell,
  IconButton,
  PlusIcon,
  Checkbox,
  Text,
  CrossIcon,
  EditIcon,
  //Pagination,
} from "evergreen-ui";
import { format, getDate, getWeekOfMonth, getMonth, getYear } from "date-fns";
import { useTranslation } from "react-i18next";
import enUS from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import { useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";

import usePrevious from "../../hooks/use-previous";
import useClickOutside from "../../hooks/use-click-outside";
import useClientDevice from "../../hooks/use-client-device";
import useRelativeHeight from "../../hooks/use-relative-height";

import EventForm from "../../components/event-form/event-form.component";
import AgendaHeader from "./agenda-subcomponents/agenda-header.component";
import AgendaViewOptions from "./agenda-subcomponents/agenda-view-options.component";
import ModalContainer from "../../components/modal-container/modal-container.component";
import Pagination from "../../components/pagination/pagination.component";

import http from "../../http/http";
import { AgendaEvent, AgendaTableColumns } from "./agenda-page.types";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { strParseOut } from "../../utils/utility-functions/utility-functions";
import CustomTableOption from "../../components/custom-table/custom-table-option";
import useOrientation from "../../hooks/use-orientation";
import { getPageSize } from "../../components/custom-table/custom-table.utils";
import { EVENT_FORM_INITIAL_STATE } from "../../components/event-form/event-form.consts";
import useCalculateAppSize from "../../hooks/use-calculate-app-size";

const views = ["month", 'week', 'day', 'today'];
const rowHeight = 50;
const paginationSpace = 70;

const AgendaPage = () => {

  const now: Date = new Date();
  const userId = useSelector(selectCurrentUserId);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const prevDate = usePrevious(currentDate);
  const [currentView, setCurrentView] = useState<string>("month");
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<AgendaEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<AgendaEvent[]>([]);
  // const [displayEventForm, setDisplayEventForm] = useState<boolean>(false);
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const eventListRef = useRef<HTMLDivElement | null>(null);
  const eventListHeight = useRelativeHeight(eventListRef);
  const buttonsRef = useRef(null);
  useClickOutside(buttonsRef, () => setSelectedEvent(null));
  const { t, i18n } = useTranslation(["agenda"]);
  const locale = i18n.language.includes("es") ? es : enUS;
  const orientation = useOrientation();
  const clientDevice = useClientDevice();
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const { appHeight } = useCalculateAppSize();

  const requestEventsData = useCallback(async () => {
    const currentCalendarYear = getYear(currentDate);
    const currentCalendarMonth = getMonth(currentDate);
    const res = await http.get<AgendaEvent[]>(`/events/${userId}/${currentCalendarMonth+1}/${currentCalendarYear}`);
    const eventData = res.data.map((event: AgendaEvent) => ({
      ...event,
      startDate: new Date (event.startDate),
      ...event.endDate ? { endDate: new Date (event.endDate) } : {},
    }))
    setEvents(eventData);
  }, [currentDate, userId]);

  const deleteEvent = async (eventId: number) => {
    await http.delete(`/events/${userId}/${eventId}`);
    const remainingEvents = events.filter(event => event.eventId !== eventId);
    setEvents(remainingEvents);
    setSelectedEvent(null);
  }

  const data = useMemo(() => filteredEvents.map(event => {
    const { startDate, endDate, title } = event;
    const haveEndDate = endDate && !(format(event.startDate, "HH:mm") === format(endDate, 'HH:mm'));
    return {
      date: `${strParseOut(format(startDate, "EEE", { locale  }))} ${startDate.getDate()}`,
      time: format(event.startDate, "h:mm a") + (haveEndDate ? ' - ' + format(endDate, 'h:mm a') : ''),
      event: title,
      options: "",
      eventId: event.eventId
    } 
  }), [filteredEvents]);


  const columns: AgendaTableColumns = useMemo(() => [
    {
      Header: t("date"),
      accessor: "date"
    },
    {
      Header: t("time"),
      accessor: "time"
    },
    {
      Header: t("event"),
      accessor: "event"
    },
    {
      Header: "",
      accessor: "options"
    }
  ], []);


  const tableInstance = useTable(
    { 
      columns, 
      data, 
      initialState: {
        pageIndex: 0,
      },
    }, 
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    state,
    setPageSize,
    previousPage,
    nextPage,
    gotoPage,
  } = tableInstance;

  const getFlexValues = (idx: number) => idx === 0 ? 1.2 : idx === 1 ? 1.7 : idx === 2 ? 4.6 : 0;

  useEffect(() => {
    console.log(orientation);
  }, [orientation])

  useEffect(() => {
    if (prevDate && getMonth(currentDate) !== getMonth(prevDate)) { // month is 0 indexed but here I just want to check if month has changed.
      requestEventsData();
    }
  }, [currentDate, prevDate, requestEventsData]);

  useEffect(() => {
    requestEventsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(eventListHeight) {
      const pageSize = getPageSize(eventListHeight, rowHeight);
      if (pageSize > 0) setPageSize(pageSize);
    } 
  }, [eventListHeight])

  useEffect(() => {
    if (currentView === "day") {
      let viewEvents = events.filter(event => getDate(event.startDate) === getDate(currentDate));
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
    if (currentView === "week") {
      let viewEvents = events.filter(event => getWeekOfMonth(event.startDate) === getWeekOfMonth(currentDate));
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
    if (currentView === "month") {
      let viewEvents = events;
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
  }, [currentView, events, showPastEvents, currentDate])

  const filterPastEvents = (source: AgendaEvent[]) => {
    return source.filter(event => event.startDate > now);
  }

  useEffect(() => { console.log("events: ", events); }, [ events ])
  useEffect(() => {
    setCurrentEvent(null)
  }, [ events ])

  return (
    <Pane
      display="flex" 
      flexDirection="column"
      height={ appHeight }
      marginX="auto" 
    >
      <Pane paddingX={20} flex={1}>
        <AgendaHeader
          currentDate={currentDate}
          currentView={currentView}
          setCurrentDate={setCurrentDate}
        />
        <Pane
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={20}
        >
          <AgendaViewOptions
            views={views}
            setCurrentView={setCurrentView}
            setCurrentDate={setCurrentDate}
          />
          <Pane>
            <IconButton
              icon={PlusIcon} 
              onClick={() => setCurrentEvent(EVENT_FORM_INITIAL_STATE)}
            />
          </Pane>
        </Pane>
        <Checkbox
          width={170}
          marginTop={15}
          label={t("showPast")} 
          onChange={() => setShowPastEvents(!showPastEvents)}
          checked={showPastEvents}
          userSelect={"none"}
        />
      </Pane>
      <Table flex={1} {...getTableProps()}>
        <TableHead display={"flex"} userSelect={'none'}>
          {
            headerGroups.map(headerGroup => (
              headerGroup.headers.map((column, idx) => (
                <TableHeaderCell flex={getFlexValues(idx)} {...column.getHeaderProps()}>
                  {
                    column.render("Header")
                  }
                </TableHeaderCell>
              ))
            )) 
          }
        </TableHead>
        <TableBody ref={eventListRef} height={eventListHeight} overflow={"scroll"} {...getTableBodyProps()}>
          {
            page.map((row, rowIdx) => {
              prepareRow(row)
              return (
                <TableRow
                  isHighlighted={selectedEvent === rowIdx ? true : false}
                  height={rowHeight}
                  color={"#3a3e58"} 
                  position={"relative"}
                  onMouseOver={ clientDevice === "desktop" ? () => setSelectedEvent(rowIdx) : undefined}
                  onMouseLeave={ clientDevice === "desktop" ? () => setSelectedEvent(null) : undefined }
                  onTouchStart={ clientDevice === "touchscreen" ? () => {
                    setTimeoutId(setTimeout(() => setSelectedEvent(rowIdx), 500))
                  } : undefined }
                  onTouchEnd={ clientDevice === "touchscreen" ? () => {
                    clearTimeout(timeoutId)
                  } : undefined }
                  onTouchMove={ clientDevice === "touchscreen" ? () => {
                    clearTimeout(timeoutId)
                  } : undefined }
                  {...row.getRowProps()}
                >
                  {
                    row.cells.map((cell, idx) => {
                      return idx !== 3 ? (
                        <TableCell flex={getFlexValues(idx)} {...cell.getCellProps()}>
                          {
                            <Text userSelect={"none"}> 
                              {cell.render("Cell")}
                            </Text>
                          }
                        </TableCell>
                      ) :
                        <Pane
                          ref={buttonsRef}
                          width={100}
                          height={rowHeight - 1}
                          position={"absolute"}
                          display={selectedEvent === rowIdx ? "flex" : 'none'}
                          right={0}
                          backgroundColor={"#F9FAFC"}
                        >
                          <CustomTableOption
                            icon={EditIcon}
                            onClick={() => {
                              const { original: { eventId } } = page[rowIdx]
                              setCurrentEvent(events.find(e => e.eventId === eventId) as AgendaEvent); // this can"t be undefined
                              setSelectedEvent(null);
                            }}
                          />
                          <CustomTableOption
                            icon={CrossIcon}
                            color={"danger"}
                            onClick={() => {
                              const eventId = page[rowIdx].original.eventId;
                              deleteEvent((events.find(e => e.eventId === eventId) as AgendaEvent)?.eventId as number)} // this can"t be undefined
                            }
                          />
                        </Pane>
                    })
                  }
                </TableRow>
              )
            })
          } 
        </TableBody>
      </Table>
      <Pane
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Pagination
          page={state.pageIndex + 1} 
          totalPages={pageCount}
          onNextPage={nextPage}
          onPreviousPage={previousPage}
          onPageChange={page => gotoPage(page - 1)}
        />
      </Pane>
      { currentEvent &&
        <ModalContainer>
          <EventForm
            setEvents={setEvents}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
        </ModalContainer>
      }
    </Pane>
  )
}

export default AgendaPage;
