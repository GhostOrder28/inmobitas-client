import axios, { AxiosError } from 'axios'; 
import { store } from '../redux/redux-store';
import { signOutSuccess, signOutWithError } from '../redux/user/user.actions';
import { AxiosResponse } from 'axios';
import { HTTPErrorData } from './http.types';
import { toaster } from 'evergreen-ui';

import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init()

const { t } = i18next;

export const options = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
}

const http = axios.create(options);

http.interceptors.response.use<AxiosResponse | HTTPErrorData>(
  function (response) {
    return response; 
  },
  function (error: AxiosError<HTTPErrorData> | Error) {
    if (!axios.isAxiosError(error)) return console.error(t('nonAxiosError', { ns: 'error' }));
    if (!error.response) return console.error(t('noResponseError', { ns: 'error' }), error);

    const { response: { data: d } } = error;

    if (d.authorizationError) store.dispatch(signOutSuccess());
    if (d.userSessionExpiredError || d.serverError) store.dispatch(signOutWithError(error));
    if (d.authenticationError) return Promise.reject(error);
    if (d.validationErrors) return Promise.reject(error);
    if (d.unverifiedUserError) {
      toaster.warning(d.unverifiedUserError.errorMessage, {
        description: d.unverifiedUserError.errorMessageDescription,
        duration: 7
      });
    };

    console.error(t('unexpectedError', { ns: 'error' }), error)
  }
)

export default http;
