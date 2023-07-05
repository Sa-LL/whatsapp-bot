import axios, { AxiosRequestHeaders } from 'axios';
import { Call } from '../types/call';

function callHandler(
  method: string,
  url: string,
  isUrlComplete: boolean,
  data: Record<string, unknown>
) {
  const options: Call = {
    method,
  };
  if (isUrlComplete) {
    options['url'] = url;
  } else {
    options.url = `${process.env.API_URL}${url}`;
  }

  if (data !== null) {
    options['data'] = data;
  }

  options['headers'] = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as AxiosRequestHeaders;

  return options;
}

function CallRequest<T>(
  url: string,
  method = 'GET',
  data: Record<string, unknown> = null,
  isUrlComplete = false
) {
  return new Promise<T>((resolve, reject) => {
    axios(callHandler(method, url, isUrlComplete, data))
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default CallRequest;
