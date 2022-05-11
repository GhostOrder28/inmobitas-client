import http from '../utils/axios-instance';
import { AxiosResponse, AxiosError } from 'axios';

export const fetchUserInfo = async (email: string, password: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http.post('/signin', { email, password })
  } catch (err) {
    return err as AxiosError
  }
}

export const fetchNewUser = async (names: string, email: string, password: string, confirmPassword: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http.post('/signup', { names, email, password, confirmPassword })
  } catch (err) {
    return err as AxiosError
  }
}

