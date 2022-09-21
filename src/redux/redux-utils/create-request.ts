import { AxiosInstance, AxiosResponse } from "axios";

const createPostRequest = (http: AxiosInstance) => async <T, Y>(url: string, body: T): Promise<AxiosResponse<Y>> => {
  return await http.post(url, body)
}

const createGetRequest = (http: AxiosInstance) => async <T, Y>(url: string): Promise<AxiosResponse<Y>> => {
  return await http.get(url)
}

export {
  createPostRequest,
  createGetRequest
};
