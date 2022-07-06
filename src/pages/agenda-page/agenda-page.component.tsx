import React, { useState, useEffect, useCallback, useRef, TouchEvent, RefObject } from 'react';
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
  Card,
} from 'evergreen-ui';
import http from '../../utils/axios-instance';
import { format, getDate, getWeekOfMonth, getMonth, getYear } from 'date-fns';
import { useTranslation } from "react-i18next";
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { AgendaEvent } from './agenda-page.types';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { capFirst } from '../../utils/utility-functions';
import useClickOutside from '../../hooks/use-click-outside/use-click-outside';
import useRelativeHeight from '../../hooks/use-relative-height/use-relative-height';
import usePrevious from '../../hooks/use-previous/use-previous';
import AgendaViewOptions from './agenda-subcomponents/agenda-view-options.component';
import AgendaHeader from './agenda-subcomponents/agenda-header.component';
import EventForm from '../../components/event-form/event-form.component';
import ModalContainer from '../../components/modal-container/modal-container.component';
import ContentSpinner from '../../components/content-spinner/content-spinner.component';
import EventOption from './agenda-subcomponents/agenda-event-option';

const views = ['month', 'week', 'day', 'today'];

const AgendaPage = () => {

  const now: Date = new Date();
  const userId = useSelector(selectCurrentUserId);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const prevDate = usePrevious(currentDate);
  const [currentView, setCurrentView] = useState<string>('month');
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<AgendaEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<AgendaEvent[]>();
  const [displayEventForm, setDisplayEventForm] = useState<boolean>(false);
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const eventListRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { t, i18n } = useTranslation(['agenda']);
  const locale = i18n.language.includes('en') ? enUS : es;
  const eventListHeight = useRelativeHeight(eventListRef);
  useClickOutside(buttonsRef, () => setSelectedEvent(null));

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
    // Desktop 
    //const res = await http.delete(`deleteevent/${userId}/${eventId}`);
    //const remainingEvents = events.filter(event => event.eventId !== eventId);
    //setEvents(remainingEvents);

    // Mobile
    await http.delete(`deleteevent/${userId}/${eventId}`);
    const remainingEvents = events.filter(event => event.eventId !== eventId);
    setEvents(remainingEvents);
    setSelectedEvent(null);
  }

  const touchHandler = (e: TouchEvent, eventId: number) => {
    timeout.current = setTimeout(() => setSelectedEvent(eventId), 500);
  }

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
    if (currentView === 'day') {
      let viewEvents = events.filter(event => getDate(event.startDate) === getDate(currentDate));
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
    if (currentView === 'week') {
      let viewEvents = events.filter(event => getWeekOfMonth(event.startDate) === getWeekOfMonth(currentDate));
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
    if (currentView === 'month') {
      let viewEvents = events;
      if (!showPastEvents) viewEvents = filterPastEvents(viewEvents);
      setFilteredEvents(viewEvents);
    }
  }, [currentView, events, showPastEvents, currentDate])

  const filterPastEvents = (source: AgendaEvent[]) => {
    return source.filter(event => event.startDate > now);
  }

  return (
    <>
      <Pane paddingX={20}>
        <AgendaHeader
          currentDate={currentDate}
          currentView={currentView}
          setCurrentDate={setCurrentDate}
        />
        <Pane
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={20}
        >
          <AgendaViewOptions
            views={views}
            setCurrentView={setCurrentView}
            setCurrentDate={setCurrentDate}
          />
          <Pane>
            <IconButton
              paddingLeft={5}
              icon={PlusIcon} 
              onClick={() => setDisplayEventForm(true)}
            />
          </Pane>
        </Pane>
        <Checkbox
          width={170}
          marginTop={15}
          label={t('showPast')} 
          onChange={() => setShowPastEvents(!showPastEvents)}
          checked={showPastEvents}
          userSelect={'none'}
        />
      </Pane>
      <Table>
        <TableHead display={'flex'} userSelect={'none'}>
          <TableHeaderCell flex={1.2}>{ t('date') }</TableHeaderCell>
          <TableHeaderCell flex={1.7}>{ t('time') }</TableHeaderCell>
          <TableHeaderCell flex={4.6}>{ t('event') }</TableHeaderCell>
        </TableHead>
        <TableBody ref={eventListRef} height={eventListHeight} overflow={'scroll'}>
          { events ? 
            filteredEvents?.map((event, idx) => {
              const { startDate, endDate, title } = event;
              const haveEndDate = endDate && !(format(event.startDate, 'HH:mm') === format(endDate, 'HH:mm'));
              return (
                <TableRow
                  height={50}
                  isSelectable
                  key={idx}
                  color={'#3a3e58'} 
                  position={'relative'}
                  onTouchStart={(e: TouchEvent) => { touchHandler(e, idx) }}
                  onTouchEnd={() => clearTimeout(timeout.current)}
                  onTouchMove={() => clearTimeout(timeout.current)}
                >
                  <TableCell flex={1.2}><Text userSelect={'none'}>{ `${capFirst(format(startDate, 'EEE', { locale }))} ${startDate.getDate()}` }</Text></TableCell>
                  <TableCell flex={1.7}><Text userSelect={'none'}>{ format(event.startDate, 'h:mm a') + (haveEndDate ? ' - ' + format(endDate, 'h:mm a') : '') }</Text></TableCell>
                  <TableCell flex={4.6}><Text userSelect={'none'}>{ title }</Text></TableCell>
                  { idx === selectedEvent &&
                    <Pane
                      ref={buttonsRef}
                      position={'absolute'}
                      display={'flex'}
                      width={100}
                      height={49}
                      right={0}
                      backgroundColor={'#F9FAFC'}
                    >
                      <EventOption
                        icon={EditIcon}
                        onClick={() => {
                          setCurrentEvent(event);
                          setDisplayEventForm(true);
                          setSelectedEvent(null);
                        }}
                      />
                      <EventOption
                        icon={CrossIcon}
                        color={'danger'}
                        onClick={() => deleteEvent(event.eventId)}
                      />
                    </Pane>
                  }
                </TableRow>
              )
            }) :
            <ContentSpinner />
          }
        </TableBody>
      </Table>
      { displayEventForm &&
        <ModalContainer displayFn={setDisplayEventForm}>
          <EventForm
            date={currentDate}
            setEvents={setEvents}
            setDisplayEventForm={setDisplayEventForm}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
        </ModalContainer>
      }
    </>
  )
}

export default AgendaPage;
