import { asyncHandler } from '../../utils/async';
import CallRequest from '../../utils/call';
import { COUNTER_ACTIONS } from './counter.actions';
import { transformCounterAPIMessage } from './counter.model';
import { CounterResponse } from './counter.types';

const baseUrl = '/api/counter';

export const counterCreate = async (message: string): Promise<string> => {
  return '';
};

export const counterRemove = async (message: string): Promise<string> => {
  return '';
};

export const counterList = async (message: string): Promise<string> => {
  const data = await CallRequest(baseUrl);
  return transformCounterAPIMessage(
    data as CounterResponse[],
    COUNTER_ACTIONS.GET_ALL
  );
};

export const counterGet = async (message: string): Promise<string> => {
  const search = message.split(' ')[1];
  const [data, error] = await asyncHandler(CallRequest(`${baseUrl}/${search}`));
  if (error)
    return (
      `💥 ${error?.response.status} ${error?.response.data}` ||
      '💥 Ocurrió un error'
    );

  return transformCounterAPIMessage(
    data as CounterResponse,
    COUNTER_ACTIONS.GET_ONE
  );
};

export const counterReset = async (message: string): Promise<string> => {
  return '';
};

export const counterSet = async (message: string): Promise<string> => {
  return '';
};

export const counterAdd = async (message: string): Promise<string> => {
  const search = message.split(' ');
  const [dataGet, errorGet] = await asyncHandler(
    CallRequest(`${baseUrl}/${search[2]}`)
  );

  if (errorGet)
    return (
      `💥 ${errorGet?.response.status} ${errorGet?.response.data}` ||
      '💥 Ocurrió un error'
    );
  const [dataPatch, errorPatch] = await asyncHandler(
    CallRequest(`${baseUrl}/${dataGet._id}`, 'PATCH', {
      count: search[3] ? search[3] : dataGet.count + 1,
    })
  );

  if (errorPatch)
    return (
      `💥 ${errorPatch?.response.status} ${errorPatch?.response.data}` ||
      '💥 Ocurrió un error'
    );
  return transformCounterAPIMessage(
    dataPatch as CounterResponse,
    COUNTER_ACTIONS.GET_ONE
  );
};

export const counterSubtract = async (message: string): Promise<string> => {
  return '';
};

export const counterHelp = async (message: string): Promise<string> => {
  return '';
};
