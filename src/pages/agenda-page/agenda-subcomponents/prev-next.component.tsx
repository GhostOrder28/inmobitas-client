import React, { FC } from 'react';
import { Pane, ChevronLeftIcon, ChevronRightIcon, Heading } from 'evergreen-ui';
import {
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths
} from 'date-fns';
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

type AgendaHeaderProps = {
  currentDate: Date;
  currentView: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const AgendaHeader: FC<AgendaHeaderProps> = ({ currentDate, currentView, setCurrentDate }) => {
  const { t, i18n } = useTranslation(['agenda']);
  const locale = i18n.language.includes('en') ? enUS : es;
  const onChange = (action: string) => {
    if (currentView === 'month') {
      if (action === 'prev') setCurrentDate(subMonths(currentDate, 1));
      if (action === 'next') setCurrentDate(addMonths(currentDate, 1));
    }
    if (currentView === 'week') {
      if (action === 'prev') setCurrentDate(subWeeks(currentDate, 1));
      if (action === 'next') setCurrentDate(addWeeks(currentDate, 1));
    }
    if (currentView === 'day') {
      if (action === 'prev') setCurrentDate(subDays(currentDate, 1));
      if (action === 'next') setCurrentDate(addDays(currentDate, 1));
    }
  }
  return (
    <Pane 
      display={'flex'}
      justifyContent={'space-between'}
      marginTop={30}
    >
      <ChevronLeftIcon
        size={25}
        cursor={'pointer'}
        color={'#3a3e58'}
        onClick={() => onChange('prev')}
      />
      <Heading
        is={'h1'} 
        size={800} 
        textAlign={'center'}
      >
        { currentView === 'month' ?
          format(currentDate, 'MMMM', { locale }) :
          currentView === 'day' ?
          `${format(currentDate, 'EEEE', { locale })}, ${format(currentDate, 'd', { locale })} ${format(currentDate, 'MMMM', { locale })}` : null
        }
      </Heading>
      <ChevronRightIcon
        size={25}
        cursor={'pointer'}
        color={'#3a3e58'}
        onClick={() => onChange('next')}
      />
    </Pane>

  )
}

export default AgendaHeader;
