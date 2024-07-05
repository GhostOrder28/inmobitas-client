import axios, { AxiosError } from 'axios'; 
import { store } from '../redux/redux-store';
import { signOutSuccess } from '../redux/user/user.actions';
import { AxiosResponse } from 'axios';
import { HTTPErrorData } from './http.types';

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
  function (error: AxiosError<HTTPErrorData>) {
    if (!error.response) throw new Error(`there is an error but it doesn't have a response: ${error}`);
    const { response: { data: { authorizationError, authenticationError, dbConnectionError } } } = error;

    if (authorizationError) store.dispatch(signOutSuccess());
    if (authenticationError) store.dispatch(signOutSuccess());
    if (dbConnectionError) store.dispatch(signOutSuccess());
    return Promise.reject(error);
  }
)

export default http;
