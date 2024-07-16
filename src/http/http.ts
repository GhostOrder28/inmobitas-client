import axios, { AxiosError } from 'axios'; 
import { store } from '../redux/redux-store';
import { signOutSuccess, signOutWithError } from '../redux/user/user.actions';
import { AxiosResponse } from 'axios';
import { HTTPErrorData } from './http.types';
import { toaster } from 'evergreen-ui';

export const options = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: '/',
}

const http = axios.create(options);

http.interceptors.response.use<AxiosResponse | HTTPErrorData>(
  function (response) {
    return response; 
  },
  function (error: AxiosError<HTTPErrorData> | Error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error(`there is an error but it doesn't have a response: ${error}`);
      const { response: { data: { 
        authorizationError,
        authenticationError, 
        serverError,
        unverifiedUserError,
        userSessionExpiredError,
      } } } = error;

      if (authorizationError) store.dispatch(signOutSuccess());
      // if (authenticationError) store.dispatch(signOutSuccess());
      if (userSessionExpiredError || serverError) store.dispatch(signOutWithError(error));

      if (unverifiedUserError) {
        toaster.warning(unverifiedUserError.errorMessage, {
          description: unverifiedUserError.errorMessageDescription,
          duration: 7
        });
      };
    } else {
      toaster.warning(( error as Error ).message, {
        duration: 5
      });
      console.error(error)
    };

    return Promise.reject(error);
  }
)

export default http;
