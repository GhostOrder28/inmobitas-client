import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Field } from "react-final-form";
import { 
  Button, 
  Pane, 
  TextInput, 
  Text, 
  Heading, 
} from "evergreen-ui";
import { EventFormData } from "./event-form.types";
import http from '../../utils/axios-instance';
import { ValidationError } from "../../redux/redux.types";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { AgendaEvent } from '../../pages/agenda-page/agenda-page.types';
import TimePicker from '../time-picker/time-picker.component';
import DatePicker from '../date-picker/date-picker.component';
import { css } from 'glamor';
import { compareAsc } from 'date-fns';
import ErrorMessage from '../error-messages/error-messages.component';
import { selectValidationErrMsg } from '../../utils/utility-functions';
import useClickOutside from '../../hooks/use-click-outside/use-click-outside';
import './event-form.styles.scss';
import 'react-day-picker/dist/style.css';

type EventFormProps = {
  date: Date;
  setEvents: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  setDisplayEventForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent?: AgendaEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<AgendaEvent | null>>;
}

const EventForm = ({ selectedEvent, setSelectedEvent, date, setEvents, setDisplayEventForm }: EventFormProps) => {
  const userId = useSelector(selectCurrentUserId);
  const [formInitialState, setFormInitialState] = useState({});
  const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const formRef = useRef(null);

  useClickOutside(formRef, () => {
    console.log('clicked outside!');
    setDisplayEventForm(false);
    setSelectedEvent(null);
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

  const onSubmit = async (values: EventFormData) => {
    try {
      const { data } = selectedEvent ? 
        await http.put<AgendaEvent>(`/editevent/${userId}/${selectedEvent.eventId}`, values) :
        await http.post<AgendaEvent>(`/event/${userId}`, values);
      const eventData = {
        ...data,
        startDate: new Date (data.startDate),
        endDate: new Date (data.endDate || data.startDate),
      }

      setEvents((prev) => {
        let arr = null;
        if (selectedEvent) {
          setSelectedEvent(null);
          const remainingEvents = prev.filter(event => event.eventId !== eventData.eventId);
          arr = [...remainingEvents, eventData];
        } else {
          arr = [...prev, eventData];
        }
        arr.sort((a, b) => compareAsc(a.startDate, b.startDate));
        return arr;
      })
      setDisplayEventForm(false)
    } catch (err) {
      setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
    }
  };

  return (
    <Pane width={350}  padding={20} ref={formRef}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedEvent || formInitialState}
        // validate={validate}
        render={({ handleSubmit, values, modified }) => {
          console.log("form values: ", values);
          return (
        <form onSubmit={handleSubmit} className={field}>
        <Heading size={800}>{ selectedEvent ? t('editEvent') : t('newEvent') }</Heading>
          <Pane marginTop={10}>
            <Text>
              { t('eventTitle') + ' *' }
            </Text>
            <Field name="title" component="input">
            {(props) => (
              <TextInput
                {...props.input}
                placeholder={ t('describeEvent') }
                width={"100%"}
                />
            )}
              </Field>
          <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, 'title')} />
            </Pane>
          <Pane>
          <Text display={'block'}>{ t('date') }</Text>
            <Field name="startDate" component="input">
            {(props) => (
              <DatePicker
                value={props.input.value}
                onChange={props.input.onChange}
                />
            )}
              </Field>
          <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, 'startDate')} />
            </Pane>
          <Pane>
          <Text display={'block'}>{ displayEndDate ? t('startTime') : t('time') }</Text>
            <Field name="startDate" component="input">
            {(props) => (
              <TimePicker
                value={props.input.value}
                onChange={props.input.onChange}
                />
            )}
              </Field>
          <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, 'startDate')} />
            </Pane>
            { displayEndDate &&
          <Pane>
          <Text display={'block'}>{ t('endTime') }</Text>
            <Field name="endDate" component="input">
            {(props) => (
              <TimePicker
                value={modified?.endDate ? props.input.value : values.startDate}
                onChange={props.input.onChange}
                />
            )}
              </Field>
          <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, 'endDate')} />
          </Pane>
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
              { selectedEvent ? t('editEvent') : t('addNewEvent') } 
            </Button>
          </Pane>
          </form>
          );
        }}
        />
    </Pane>
  );
};

export default EventForm;

