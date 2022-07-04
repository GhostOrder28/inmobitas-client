import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import usePrevious from '../../hooks/use-previous/use-previous';
import AgendaViewOptions from './agenda-subcomponents/agenda-view-options.component';
import AgendaHeader from './agenda-subcomponents/agenda-header.component';
import EventForm from '../../components/event-form/event-form.component';
import ModalContainer from '../../components/modal-container/modal-container.component';
import ContentSpinner from '../../components/content-spinner/content-spinner.component';

const views = ['month', 'week', 'day', 'today'];

const AgendaPage = () => {

  const now: Date = new Date();
  const userId = useSelector(selectCurrentUserId);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const prevDate = usePrevious(currentDate);
  const [currentView, setCurrentView] = useState<string>('month');
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<AgendaEvent[]>();
  const [displayEventForm, setDisplayEventForm] = useState<boolean>(false);
  const [displayEventOptions, setDisplayEventOptions] = useState<boolean>(false);
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const buttonsRef = useRef(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { t, i18n } = useTranslation(['agenda']);
  const locale = i18n.language.includes('en') ? enUS : es;

  useClickOutside(buttonsRef, () => setDisplayEventOptions(false));

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
    console.log('deleting...')
    await http.delete(`deleteevent/${userId}/${eventId}`);
    const remainingEvents = events.filter(event => event.eventId !== eventId);
    setEvents(remainingEvents);
    setDisplayEventOptions(false);
  }

  useEffect(() => {
    console.log(events)
  }, [events])

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
            {/*<IconButton
              icon={TrashIcon}
              onClick={() => setDisplayEventOptions(!displayEventOptions)}
            />*/}
            <IconButton
              marginLeft={5}
              icon={PlusIcon} 
              onClick={() => setDisplayEventForm(true)}
            />
          </Pane>
        </Pane>
        <Checkbox
          width={135}
          marginTop={15}
          label={t('showPast')} 
          onChange={() => setShowPastEvents(!showPastEvents)}
          checked={showPastEvents}
        />
      </Pane>
      <Table>
        <TableHead display={'flex'}>
          <TableHeaderCell flex={1.2}>{ t('date') }</TableHeaderCell>
          <TableHeaderCell flex={1.7}>{ t('time') }</TableHeaderCell>
          <TableHeaderCell flex={4.6}>{ t('event') }</TableHeaderCell>
        </TableHead>
        <TableBody>
          { events ? 
            filteredEvents?.map((event, idx) => {
              const { startDate, endDate, title } = event;
              const haveEndDate = endDate && !(format(event.startDate, 'HH:mm') === format(endDate, 'HH:mm'));
              return (
                <TableRow 
                  key={idx} 
                  color={'#3a3e58'} 
                  position={'relative'}
                  onTouchStart={() =>{ timeout.current = setTimeout(() => setDisplayEventOptions(true), 500) }}
                  onTouchEnd={() => clearTimeout(timeout.current)}
                >
                  <TableCell flex={1.2}><Text userSelect={'none'}>{ `${capFirst(format(startDate, 'EEE', { locale }))} ${startDate.getDate()}` }</Text></TableCell>
                  <TableCell flex={1.7}><Text userSelect={'none'}>{ format(event.startDate, 'h:mm a') + (haveEndDate ? ' - ' + format(endDate, 'h:mm a') : '') }</Text></TableCell>
                  <TableCell flex={4.6}><Text userSelect={'none'}>{ title }</Text></TableCell>
                  { displayEventOptions &&
                    <Pane
                      ref={buttonsRef}
                      position={'absolute'}
                      display={'flex'}
                      right={0}
                      width={120}
                      marginTop={15}
                      backgroundColor={'white'}
                      paddingLeft={10}
                    >
                      <TableCell>
                        <IconButton
                          icon={EditIcon}
                          onClick={() => {
                            setSelectedEvent(event);
                            setDisplayEventForm(true);
                            setDisplayEventOptions(false);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          icon={CrossIcon}
                          intent={'danger'}
                          onClick={() => deleteEvent(event.eventId)}
                        />
                      </TableCell>
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
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        </ModalContainer>
      }
    </>
  )
}

export default AgendaPage;
