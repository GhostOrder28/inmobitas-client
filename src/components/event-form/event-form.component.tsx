import React, { useEffect, useState, useRef, FC } from "react";
import { useTranslation } from "react-i18next";
import { 
  Button, 
  Pane, 
  TextInput, 
  Text, 
  Heading, 
} from "evergreen-ui";
import { EventFormData } from "./event-form.types";
import http from '../../http/http';
import { ValidationError } from "../../http/http.types";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { AgendaEvent } from '../../pages/agenda-page/agenda-page.types';
import TimePicker from '../time-picker/time-picker.component';
import DatePicker from '../date-picker/date-picker.component';
import { css } from 'glamor';
import { compareAsc } from 'date-fns';
import FieldErrorMessage from '../field-error-message/field-error-message.component';
// import { selectValidationErrMsg } from '../../utils/utility-functions';
import useClickOutside from '../../hooks/use-click-outside';
import './event-form.styles.scss';
import { useForm } from "react-hook-form";
import { EVENT_FORM_INITIAL_STATE } from "./event-form.consts";
import Input from "../input/input.component";
import { onSubmitEventData } from "./event-form.api";

type EventFormProps = {
  date: Date;
  setEvents: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  setDisplayEventForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent?: AgendaEvent | undefined;
  setCurrentEvent: React.Dispatch<React.SetStateAction<AgendaEvent | undefined>>;
}

const EventForm: FC<EventFormProps> = ({ currentEvent, setCurrentEvent, date, setEvents, setDisplayEventForm }) => {
  const userId = useSelector(selectCurrentUserId);
  const [formInitialState, setFormInitialState] = useState({});
  // const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const formRef = useRef(null);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<AgendaEvent>({
    defaultValues: EVENT_FORM_INITIAL_STATE,
    values: currentEvent
  });

  const inputCommonProps = { register, errors };

  useClickOutside(formRef, () => {
    setDisplayEventForm(false);
    setCurrentEvent(undefined);
  });

  const { t } = useTranslation(['agenda', 'ui']); 

  const field = css({
    '& > div': {
      'margin-top': '10px'
    }
  }).toString();

  useEffect(() => {
    setFormInitialState({
      startDate: new Date(date)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const onSubmit = async (values: Omit<EventFormData, 'eventId'> & { eventId?: number }) => {
  //   console.log(values)
  //   const { eventId, ...rest } = values;
  //   const valuesWithoutId = rest;
  //   try {
  //     const { data } = currentEvent ? 
  //       await http.put<AgendaEvent>(`/events/${userId}/${currentEvent.eventId}`, valuesWithoutId) :
  //       await http.post<AgendaEvent>(`/events/${userId}`, values);
  //
  //     console.log(data)
  //     const eventData = {
  //       ...data,
  //       startDate: new Date (data.startDate),
  //       endDate: new Date (data.endDate || data.startDate),
  //     }
  //
  //     setEvents((prev) => {
  //       let arr = null;
  //       if (currentEvent) {
  //         setCurrentEvent(undefined);
  //         const remainingEvents = prev.filter(event => event.eventId !== eventData.eventId);
  //         arr = [...remainingEvents, eventData];
  //       } else {
  //         arr = [...prev, eventData];
  //       }
  //       arr.sort((a, b) => compareAsc(a.startDate, b.startDate));
  //       return arr;
  //     })
  //     setDisplayEventForm(false)
  //   } catch (err) {
  //     setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
  //   }
  // };

  return (
    <Pane width={350}  padding={20} ref={formRef}>
      <form onSubmit={handleSubmit((formData) => onSubmitEventData(formData, setEvents, currentEvent, setCurrentEvent, setDisplayEventForm, setError))} className={field}>
      <Heading size={800}>{ currentEvent ? t('editEvent') : t('newEvent') }</Heading>
        <Input name='title' type="text" label={ t('eventTitle') + " *" } { ...inputCommonProps } />
        <Input name='startDate' type="date" label={ t('date') } { ...inputCommonProps } />
        <Input name='startDate' type="time" label={ t('startTime') } { ...inputCommonProps } />
        { displayEndDate &&
          <Input name='endDate' type="time" label={ t('endTime') } { ...inputCommonProps } />
        }
      <Button
        width={"100%"}
        marginTop={15}
        intent={ displayEndDate ? 'danger' : 'success' }
        type="button"
        onClick={() => setDisplayEndDate(!displayEndDate)}
      >
        { displayEndDate ? t('removeEndTime'): t('addEndTime') } 
      </Button>
        <Pane display="flex" marginTop={15}>
          <Button width={"100%"} type="submit" appearance="primary">
            { currentEvent ? t('editEvent') : t('addNewEvent') } 
          </Button>
        </Pane>
        </form>
    </Pane>
  );
};

export default EventForm;

