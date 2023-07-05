import {
  handleMessageParameters,
  handleMessageQuery,
} from '../../utils/messageResponse';
import { asyncHandler } from '../../utils/async';
import CallRequest from '../../utils/call';
import { COUNTER_ACTIONS } from './counter.actions';
import { COUNTER_COMMANDS, COUNTER_ROOT } from './counter.commands';
import { transformCounterAPIMessage } from './counter.model';
import { CounterAPI, CounterResponse } from './counter.types';

const baseUrl = '/api/counter';

export const counterCreate = async (message: string): Promise<string> => {
  try {
    const body = JSON.parse(`{${message.split('{')[1]}`);
    const [_, error] = await asyncHandler(CallRequest(baseUrl, 'POST', body));
    if (error) return error;

    return '✅ Se creó el contador';
  } catch (error) {
    return '💥 Ocurrió un error en el formato';
  }
};

export const counterRemove = async (message: string): Promise<string> => {
  const search = handleMessageParameters(message, COUNTER_COMMANDS.REMOVE);
  const [dataGet, errorGet] = await asyncHandler<CounterResponse>(
    CallRequest(`${baseUrl}/${search[0]}`)
  );
  if (errorGet) return errorGet;

  const [_, error] = await asyncHandler(
    CallRequest(`${baseUrl}/${dataGet._id}`, 'DELETE')
  );
  if (error) return error;
  return `✅ Se eliminó el contador "${dataGet.title}"`;
};

export const counterList = async (message: string): Promise<string> => {
  const paramsObject = handleMessageQuery(message);
  const data: CounterAPI = await CallRequest(`${baseUrl}?${paramsObject}`);

  return transformCounterAPIMessage(data, COUNTER_ACTIONS.GET_ALL);
};

export const counterGet = async (message: string): Promise<string> => {
  const search = handleMessageParameters(message, COUNTER_COMMANDS.GET);
  const [data, error] = await asyncHandler(
    CallRequest(`${baseUrl}/${search[0]}`)
  );
  if (error) return error;

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
  const search = handleMessageParameters(message, COUNTER_COMMANDS.ADD);
  const [dataGet, errorGet] = await asyncHandler<CounterResponse>(
    CallRequest(`${baseUrl}/${search[0]}`)
  );
  if (errorGet) return errorGet;

  const [dataPatch, errorPatch] = await asyncHandler(
    CallRequest(`${baseUrl}/${dataGet._id}`, 'PATCH', {
      count: search[1] ? search[1] : dataGet.count + 1,
    })
  );
  if (errorPatch) return errorPatch;

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

export const counterEdit = async (message: string): Promise<string> => {
  return '';
};
