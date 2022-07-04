import React, { useState, FC, useRef } from 'react';
import { Pane, TextInput, IconButton, TimeIcon } from 'evergreen-ui';
import { ClockPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

type TimePickerProps = {
  value: Date;
  onChange: (date: Date | null) => void;
}

const TimePicker: FC<TimePickerProps> = ({ value, onChange }) => {
  const [display, setDisplay] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Pane display={'flex'}>
        <TextInput 
          readOnly
          width={'100%'}
          marginRight={10}
          value={value && format(value, 'p')}
          onClick={() => setDisplay(true)}
        />
        <IconButton 
          type="button"
          icon={TimeIcon}
          onClick={() => setDisplay(!display)}
        />
      </Pane>
      { display && 
        <Pane
          position={'absolute'}
          zIndex={6}
          backgroundColor={'white'}
          elevation={2}
        >
          <ClockPicker
            ref={clockRef}
            date={value || null}
            ampmInClock={true}
            ampm={true}
            showViewSwitcher={true}
            onChange={(newDate, isFinish) => {
              onChange(newDate)
              if (isFinish === 'finish') {
                setDisplay(false);
              }
            }}
          />
        </Pane>
      }
    </LocalizationProvider>
  )
}

export default TimePicker;
