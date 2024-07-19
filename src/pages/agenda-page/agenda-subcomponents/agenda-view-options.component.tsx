import React, { useState, FC } from "react";
import { 
  SegmentedControl,
} from "evergreen-ui";
import { useTranslation } from "react-i18next";

type AgendaViewOptionsProps = {
  views: string[];
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const AgendaViewOptions: FC<AgendaViewOptionsProps> = ({ views, setCurrentView, setCurrentDate }) => {
  const { t } = useTranslation(["agenda"]);
  const agendaViews = views.map(view => ({
    label: `${t(view)}`,
    value: view
  }))
  function isString (val: string | boolean | number): val is string {
    return (val as string).charAt !== undefined;
  }
  const [value, setValue] = useState("month");
  return (
    <SegmentedControl 
      options={agendaViews} 
      value={value}
      onChange={(value) => {
        if (value === "today") {
          setValue("day"); 
          setCurrentView("day")
          setCurrentDate(new Date());
        } else {
          if (isString(value)) {
            setValue(value);
            setCurrentView(value);
          }
        }
      }}
    />
  )

}

export default AgendaViewOptions;
