import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { ValidationError } from "../../redux/redux.types";
import { AxiosError } from "axios";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { AgendaEvent } from '../../pages/agenda-page/agenda-page.types';
import TimePicker from '../time-picker/time-picker.component';
import DatePicker from '../date-picker/date-picker.component';
import { css } from 'glamor';
import { compareAsc } from 'date-fns';
import ErrorMessage from '../error-messages/error-messages.component';
import { selectValidationErrMsg } from '../../utils/utility-functions';
import './event-form.styles.scss';
import 'react-day-picker/dist/style.css';

type EventFormProps = {
  date: Date;
  setEvents: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  setDisplayEventForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm = ({ date, setEvents, setDisplayEventForm }: EventFormProps) => {
  const userId = useSelector(selectCurrentUserId);
  const [formInitialState, setFormInitialState] = useState({});
  const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const { t } = useTranslation(['agenda']); 

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
      const { data } = await http.post<AgendaEvent>(`/event/${userId}`, values);
      const eventData = {
        ...data,
        startDate: new Date (data.startDate),
        endDate: new Date (data.endDate || data.startDate),
      }
      setEvents((prev) => {
        const arr = [...prev, eventData];
        arr.sort((a, b) => compareAsc(a.startDate, b.startDate));
        return arr;
      })
      setDisplayEventForm(false)
    } catch (err) {
      setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={formInitialState}
      // validate={validate}
      render={({ handleSubmit, values, modified }) => {
        console.log("form values: ", values);
        return (
          <form onSubmit={handleSubmit} className={field}>
            <Heading size={800}>{ t('newEvent') }</Heading>
            <Pane marginTop={10}>
              <Text display={'block'}>{ t('eventTitle') }</Text>
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
              appearance={'primary'}
              intent={ displayEndDate ? 'danger' : 'success' }
              type="button"
              onClick={() => setDisplayEndDate(!displayEndDate)}
            >
              { displayEndDate ? t('removeEndTime'): t('addEndTime') } 
            </Button>
            <Pane display="flex" marginTop={15}>
              <Button width={"100%"} type="submit" appearance="primary">
                { t('addNewEvent') } 
              </Button>
            </Pane>
          </form>
        );
      }}
    />
  );
};

export default EventForm;

