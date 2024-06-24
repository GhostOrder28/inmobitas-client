import { Client } from "../../pages/client-page/client-page.types";
import { ValidationError } from "../../redux/redux.types";
import { AxiosError } from "axios";
import http from "../../utils/axios-instance";
import { history } from "../..";
import { Dispatch, SetStateAction } from "react";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

const onSubmitClientData = async (
  formData: Client,
  setClient: Dispatch<SetStateAction<Client | undefined>>,
  setErrors: Dispatch<SetStateAction<AxiosError<{ validationErrors: ValidationError[] }> | undefined>>
) => {
  const userId = selectCurrentUserId(store.getState());
  try {
    const { clientId, ...formDataWithoutIds } = formData;
    const res = await http.put<Client>(`/clients/${userId}/${clientId}`, formDataWithoutIds);

    setClient(res.data);
    history.push(`/clientdetail/${clientId}`)
  } catch (err) {
    setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
  }
}

export {
  onSubmitClientData,
}
