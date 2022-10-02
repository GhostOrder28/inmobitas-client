import axios from 'axios'; 
import { store } from '../redux/redux-store';
import { signOutSuccess } from '../redux/user/user.actions';

export const options = {
  withCredentials: true,
  baseURL: `https://inmobitas.herokuapp.com/`,
  //baseURL: `https://localhost:3001/`,
  //baseURL: process.env.NODE_ENV === 'production' ? 'https://inmobitas.herokuapp.com/' : `https://localhost:3001/`,
}

const http = axios.create(options);

http.interceptors.response.use(
  function (response) {
    return response; 
  },
  function (error) {
    if (error.response.data.authorizationError) store.dispatch(signOutSuccess());
    return Promise.reject(error);
  }
)

export default http;
