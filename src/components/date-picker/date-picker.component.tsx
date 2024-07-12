import { useState, FC } from 'react';
import { Pane, TextInput, IconButton, CalendarIcon, minorScale } from 'evergreen-ui';
import { format } from 'date-fns';
import { DayPicker } from "react-day-picker";
import { useTranslation } from 'react-i18next';
import useAutoHidePopup from "../../hooks/use-auto-hide-popup";
import { handleDateSelection } from "./date-picker.utils";

import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import 'react-day-picker/dist/style.css';

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => { 
  const [display, setDisplay] = useState(false);
  const { i18n } = useTranslation()
  const locale = i18n.language?.includes('es') ? es : enUS; // the ? operator here is just for snapshot testing purposes, in the browser language is never undefined
  useAutoHidePopup(value, setDisplay)

  return (
    <Pane position={'relative'} width={'100%'}>
      <Pane display={'flex'}>
        <TextInput
          disabled
          width={'100%'}
          marginRight={minorScale(3)}
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
          right={0}
          elevation={2}
          backgroundColor={'white'}
        >
          <DayPicker
            mode="single"
            locale={locale}
            selected={value} 
            onSelect={(newDate: Date | undefined) => { handleDateSelection(value, newDate, onChange) }}
          />
        </Pane>
      }
    </Pane>
  )
}

export default DatePicker;
