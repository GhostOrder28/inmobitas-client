import { AxiosInstance, AxiosResponse } from "axios";

const createRequest = (http: AxiosInstance) => async <T, Y>(url: string, body: T): Promise<AxiosResponse<Y>> => {
  return await http.post(url, body)
}

export default createRequest;
