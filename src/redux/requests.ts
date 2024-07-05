import http from '../http/http';
import { AxiosResponse, AxiosError } from 'axios';

export const fetchUserInfo = async (email: string, password: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http.post('/signin', { email, password })
  } catch (err) {
    return err as AxiosError
  }
}

export const fetchNewUser = async (names: string, email: string, contactPhone: number, password: string, confirmPassword: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http.post('/signup', { names, email, contactPhone, password, confirmPassword })
  } catch (err) {
    return err as AxiosError
  }
}

