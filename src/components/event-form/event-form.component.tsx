import React, { useEffect, useState, useRef, FC } from "react";
import { useTranslation } from "react-i18next";
import { 
  Button, 
  Pane, 
  Heading, 
} from "evergreen-ui";
import { AgendaEvent } from '../../pages/agenda-page/agenda-page.types';
import useClickOutside from '../../hooks/use-click-outside';
import './event-form.styles.scss';
import { EVENT_FORM_INITIAL_STATE } from "./event-form.consts";
import Input from "../input/input.component";
import { onSubmitEventData } from "./event-form.api";
import { useInitializeEndDate } from "./event-form.utils";
import useGenerateForm from "../../hooks/use-generate-form";
import Form from "../form/form.component";

type EventFormProps = {
  date: Date;
  setEvents: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  setDisplayEventForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent?: AgendaEvent | undefined;
  setCurrentEvent: React.Dispatch<React.SetStateAction<AgendaEvent | undefined>>;
}

const EventForm: FC<EventFormProps> = ({ currentEvent, setCurrentEvent, date, setEvents, setDisplayEventForm }) => {
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const formRef = useRef(null);

  const { 
    handleSubmit, 
    setError, 
    setValue, 
    getValues, 
    inputCommonProps,
    controlledCommonProps
  } = useGenerateForm<AgendaEvent>(EVENT_FORM_INITIAL_STATE, currentEvent);

  useInitializeEndDate(displayEndDate, setValue, getValues)

  useClickOutside(formRef, () => {
    setDisplayEventForm(false);
    setCurrentEvent(undefined);
  });

  const { t } = useTranslation(['agenda', 'ui']); 

  return (
    <Pane width={350}  padding={20} ref={formRef}>
      <Form 
        onSubmit={handleSubmit((formData) => onSubmitEventData(formData, setEvents, currentEvent, setCurrentEvent, setDisplayEventForm, setError))} 
      >
        <Heading size={800}>{ currentEvent ? t('editEvent') : t('newEvent') }</Heading>
        <Input name='title' type="text" placeholder={ t('eventTitle') + " *" } { ...inputCommonProps } />
        <Input name='startDate' type="date" label={ t('date') } { ...controlledCommonProps } />
        <Input name='startDate' type="time" label={ t('startTime') } { ...controlledCommonProps } />
        { displayEndDate &&
          <Input name='endDate' type="time" label={ t('endTime') } { ...controlledCommonProps } />
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
      </Form>
    </Pane>
  );
};

export default EventForm;

