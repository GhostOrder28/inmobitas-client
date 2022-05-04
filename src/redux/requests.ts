import http from '../utils/axios-instance';
import { AxiosResponse, AxiosError } from 'axios';

export const fetchUserInfo = async (email: string, password: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http.post('/signin', { email, password })
  } catch (err) {
    //throw err as AxiosError
    return err as AxiosError
  }
}

