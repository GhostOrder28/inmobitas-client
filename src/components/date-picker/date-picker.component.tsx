import React, { useState, FC } from 'react';
import { Pane, TextInput, IconButton, CalendarIcon } from 'evergreen-ui';
import { format } from 'date-fns';
import { DayPicker } from "react-day-picker";
import { getLocale } from '../../utils/utility-functions';

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

const locale = getLocale();

const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => { 
  const [display, setDisplay] = useState(false);
  return (
    <Pane position={'relative'} width={'100%'}>
      <Pane display={'flex'}>
        <TextInput
          disabled
          width={'100%'}
          marginRight={10}
          value={value && format(value, 'yyyy-MM-dd')}
          onClick={() => setDisplay(true)}
        />
        <IconButton
          type="button"
          icon={CalendarIcon} 
          onClick={() => setDisplay(!display)}
        />
      </Pane>
      { display &&
      <Pane
        position={'absolute'}
        zIndex={5}
        elevation={2}
        backgroundColor={'white'}
      >
        <DayPicker
          mode="single"
          locale={locale}
          selected={ value } 
          onSelect={(newDate) => {
            if (!newDate) return;
            const date = new Date(newDate);
            if (value) {
              date.setHours(value.getHours());
              date.setMinutes(value.getMinutes());
            }
            onChange(date)
            setDisplay(false); 
          }}
        />
      </Pane>
      }
    </Pane>
  )
}

export default DatePicker;
