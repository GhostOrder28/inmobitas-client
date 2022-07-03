import React, { FC, useState, useEffect } from 'react';
import { Pane, ChevronLeftIcon, ChevronRightIcon, Heading } from 'evergreen-ui';
import {
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
  getYear,
  isSameMonth
} from 'date-fns';
import { useTranslation } from "react-i18next";
import { format, startOfWeek, endOfWeek,} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { capFirst } from '../../../utils/utility-functions';

type AgendaHeaderProps = {
  currentDate: Date;
  currentView: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const AgendaHeader: FC<AgendaHeaderProps> = ({ currentDate, currentView, setCurrentDate }) => {
  const { t, i18n } = useTranslation(['agenda']);
  const locale = i18n.language.includes('en') ? enUS : es;
  const [outOfRange, setOutOfRange] = useState<boolean>();
  const firstDayOfTheWeek = startOfWeek(currentDate);
  const lastDayOfTheWeek = endOfWeek(currentDate);

  useEffect(() => {
    if (isSameMonth(currentDate, firstDayOfTheWeek) && isSameMonth(currentDate, lastDayOfTheWeek)) {
      setOutOfRange(false)
    } else {
      setOutOfRange(true)
    }
  }, [currentDate])

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
      alignItems={'center'}
      marginTop={20}
    >
      <ChevronLeftIcon
        size={25}
        cursor={'pointer'}
        color={'#3a3e58'}
        onClick={() => onChange('prev')}
      />
      <Pane>
        <Heading
          is={'h1'} 
          size={600} 
          textAlign={'center'}
          color={'#3a3e58'}
        >
          { currentView === 'month' ?
            capFirst(format(currentDate, 'MMMM', { locale })) :
            currentView === 'week' ?
            `${capFirst(format(startOfWeek(currentDate), 'EEEE', { locale }))} ${format(startOfWeek(currentDate), 'd')} - ${capFirst(format(endOfWeek(currentDate), 'EEEE', { locale }))} ${format(endOfWeek(currentDate), 'd')}`:
            currentView === 'day' ?
            `${capFirst(format(currentDate, 'EEEE', { locale }))} ${format(currentDate, 'd', { locale })}` : null
          }
        </Heading>
        <Heading
          is={'h2'}
          textAlign={'center'}
          size={200}
        >
          {`(${
              currentView === 'week' ? 
                (
                  outOfRange ?
                  format(firstDayOfTheWeek, 'MMMM ', { locale }) + ' - ' + format(lastDayOfTheWeek, 'MMMM', { locale }) + ' / ' :
                  format(currentDate, 'MMMM', { locale }) + ' / '
                ) :
              currentView === 'day' ?
                capFirst(format(currentDate, 'MMMM', { locale })) + ' / ':
                ''
            }${getYear(currentDate)})`}
        </Heading>
      </Pane>
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
