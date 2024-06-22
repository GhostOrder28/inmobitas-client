import { Client } from "../../pages/client-page/client-page.types";
import { t } from "i18next";

const formatClientData = (clientData: Client | undefined) => {
  return [
    {
      label: t('client:contactPhone'),
      content: clientData?.clientContactPhone || ''
    },
    {
      label: t('client:clientAge'),
      content: clientData?.clientAge || ''
    },
    {
      label: t('client:clientDetails'),
      content: clientData?.clientDetails || ''
    },
  ];
};

export {
  formatClientData
}
