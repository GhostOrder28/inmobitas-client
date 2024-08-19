import React, { useRef, FC } from "react";
import { useTranslation } from "react-i18next";
import { 
  Button, 
  Pane, 
  Heading, 
  minorScale
} from "evergreen-ui";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";
import useClickOutside from "../../hooks/use-click-outside";
import "./event-form.styles.scss";
import { EVENT_FORM_INITIAL_STATE } from "./event-form.consts";
import Input from "../input/input.component";
import { onSubmitEventData } from "./event-form.api";
import useGenerateForm from "../../hooks/use-generate-form";
import Form from "../form/form.component";

type EventFormProps = {
  setEvents: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  currentEvent?: AgendaEvent;
  setCurrentEvent: React.Dispatch<React.SetStateAction<AgendaEvent | null>>;
}

const EventForm: FC<EventFormProps> = ({ currentEvent, setCurrentEvent, setEvents }) => {
  const formRef = useRef(null);

  const { 
    handleSubmit, 
    unregister,
    setError, 
    setValue, 
    getValues, 
    watch,
    inputCommonProps,
    controlledCommonProps
  } = useGenerateForm<AgendaEvent>(EVENT_FORM_INITIAL_STATE, currentEvent); 

  const endDate = watch("endDate");

  useClickOutside(formRef, () => {
    setCurrentEvent(null); // this is the only utility for this funtion, can I manage to get rid of this?
  });

  const { t } = useTranslation(["agenda", "ui"]); 

  return (
    <Pane width={350} ref={formRef}>
      <Form 
        onSubmit={handleSubmit((formData) => onSubmitEventData(formData, setEvents, setError))} 
        paddingX={ minorScale(5) }
        gap={ minorScale(5) }
      >
        <Heading size={800}>{ currentEvent ? t("editEvent") : t("newEvent") }</Heading>
        <Input name="title" type="text" placeholder={ t("eventTitle") + " *" } { ...inputCommonProps } />
        <Input name="startDate" type="date" label={ t("date") } { ...controlledCommonProps } />
        <Input name="startDate" type="time" label={ t("startTime") } { ...controlledCommonProps } />
        { endDate &&
          <Input name="endDate" type="time" label={ t("endTime") } { ...controlledCommonProps } />
        }
        <Button
          intent={ watch("endDate") ? "danger" : "success" }
          type="button"
          onClick= { () => 
            endDate ?
              unregister("endDate") : 
              setValue("endDate", getValues("startDate"))
          }
        >
          { endDate ? t("removeEndTime"): t("addEndTime") } 
        </Button>
        <Button type="submit" appearance="primary">
          { currentEvent?.eventId ? t("editEvent") : t("addNewEvent") } 
        </Button>
      </Form>
    </Pane>
  );
};

export default EventForm;

