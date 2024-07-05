import { Client } from "../../pages/client-page/client-page.types";
import http from "../../http/http";
import axios from "axios";
import { history } from "../..";
import { Dispatch, SetStateAction } from "react";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { UseFormSetError } from "react-hook-form";
import { handleValidationErrors } from "../../utils/utility-functions/utility-functions";
import { HTTPErrorData } from "../../http/http.types";

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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw new Error(`there is an error but it doesn't have a response: ${err}`);

      const errorData: HTTPErrorData = err.response.data;

      if (errorData.validationErrors) {
        handleValidationErrors<Client>(clientData, errorData.validationErrors, setError); 
      } else {
        throw errorData;
      }
    } else {
      console.error(err)
    };
  }
}

export {
  onSubmitClientData,
}
