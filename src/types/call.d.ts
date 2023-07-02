import { AxiosRequestHeaders } from 'axios';

export type Call = {
  method: string;
  url?: string;
  data?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
};
