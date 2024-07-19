import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { Client } from "../../pages/client-page/client-page.types";

i18next.use(initReactI18next).init()

const formatClientData = (clientData: Client | undefined) => {
  const { t } = i18next;
  return [
    {
      label: t("contactPhone", { ns: 'client' }),
      content: clientData?.clientContactPhone || ""
    },
    {
      label: t("clientAge", { ns: 'client' }),
      content: clientData?.clientAge || ""
    },
    {
      label: t("clientDetails", { ns: 'client' }),
      content: clientData?.clientDetails || ""
    },
  ];
};

export {
  formatClientData
}
