import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const request = <T>(config: AxiosRequestConfig) =>
  axios(config).then((response: AxiosResponse<T>) => response.data);
