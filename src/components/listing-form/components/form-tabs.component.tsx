import { useState } from "react";
import { Tablist, Tab, minorScale } from "evergreen-ui";
import { useTranslation } from "react-i18next";

const FormTabs = () => {
  const [selectedMode, setSelectedMode] = useState<number>(1);
  const { t } = useTranslation(["listing", "client", "ui", "error"]);

  return (
    <Tablist 
      width="100%" 
      display="flex" 
      className="tablist"
    >
      {[t("basic", { ns: "listing" }), t("detailed", { ns: "listing" })].map((tab, index) => (
        <Tab
          key={tab}
          id={tab}
          onSelect={() => setSelectedMode(index)}
          isSelected={index === selectedMode}
          aria-controls={`panel-${tab}`}
          flex={1}
          borderRadius={0}
          paddingY={minorScale(5)}
        >
          {tab}
        </Tab>
      ))}
    </Tablist>
  )
};

export default FormTabs;
