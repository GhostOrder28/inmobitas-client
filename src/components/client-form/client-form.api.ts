import { Client } from "../../pages/client-page/client-page.types";
import http from "../../http/http";
import axios from "axios";
import { history } from "../..";
import { Dispatch, SetStateAction } from "react";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { UseFormSetError } from "react-hook-form";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";

import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init()

const { t } = i18next;

const onSubmitClientData = async (
  clientData: Client,
  setClient: Dispatch<SetStateAction<Client | undefined>>,
  setError: UseFormSetError<Client>,
) => {
  const userId = selectCurrentUserId(store.getState());
  try {
    const { clientId, ...formDataWithoutIds } = clientData;
    const res = await http.put<Client>(`/clients/${userId}/${clientId}`, formDataWithoutIds);

    setClient(res.data);
    history.push(`/clientdetail/${clientId}`)
  } catch (error) {
    if (!axios.isAxiosError(error)) return console.error(t('nonAxiosError', { ns: 'error' }), error);

    const { data: { validationErrors } } = error.response!!;
    handleValidationErrors<Client>(clientData, validationErrors, setError); 
  }
}

export {
  onSubmitClientData,
}
