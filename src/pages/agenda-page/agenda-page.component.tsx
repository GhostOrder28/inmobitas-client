import React, { useState, useEffect, useCallback } from 'react';
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
  const [filteredEvents, setFilteredEvents] = useState<AgendaEvent[]>();
  const [displayEventForm, setDisplayEventForm] = useState<boolean>(false);
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const { t, i18n } = useTranslation(['agenda']);
  const locale = i18n.language.includes('en') ? enUS : es;

  const requestEventsData = useCallback(async () => {
    const currentCalendarYear = getYear(currentDate);
    const currentCalendarMonth = getMonth(currentDate);
    const res = await http.get<AgendaEvent[]>(`/events/${userId}/${currentCalendarMonth+1}/${currentCalendarYear}`);
    const eventData = res.data.map((event: AgendaEvent) => ({
      ...event,
      startDate: new Date (event.startDate),
      endDate: new Date (event.endDate || event.startDate),
    }))
    setEvents(eventData);
  }, [currentDate, userId])


  useEffect(() => {
    console.log('runs!')
    if (prevDate && getMonth(currentDate) !== getMonth(prevDate)) { // month is 0 indexed but here I just want to check if month has changed.
      console.log('rans!')
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
          <IconButton 
            icon={PlusIcon} 
            onClick={() => setDisplayEventForm(true)}
          />
        </Pane>
        <Checkbox
          marginTop={15}
          label={t('showPast')} 
          onChange={() => setShowPastEvents(!showPastEvents)}
          checked={showPastEvents}
        />
      </Pane>
      <Table>
        <TableHead display={'flex'}>
          <TableHeaderCell flex={1.6}>{ t('date') }</TableHeaderCell>
          <TableHeaderCell flex={2.5}>{ t('time') }</TableHeaderCell>
          <TableHeaderCell flex={5}>{ t('event') }</TableHeaderCell>
        </TableHead>
        <TableBody>
          { events ? 
            filteredEvents?.map((event, idx) => {
              const { startDate, endDate, title } = event;
              const haveEndDate = endDate && !(format(event.startDate, 'HH:mm') === format(endDate, 'HH:mm'));
              return (
                <TableRow key={idx} color={'#3a3e58'}>
                  <TableCell flex={1.6} fontSize={'medium'}>{ `${capFirst(format(startDate, 'EEE', { locale }))} ${startDate.getDate()}` }</TableCell>
                  <TableCell flex={2.5}>{ format(event.startDate, 'h:mm a') + (haveEndDate ? ' - ' + format(endDate, 'h:mm a') : '') }</TableCell>
                  <TableCell flex={5}>{ title }</TableCell>
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
          />
        </ModalContainer>
      }
    </>
  )
}

export default AgendaPage;
