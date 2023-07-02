import { Model } from '../../types/model';
import { CounterResponse } from './counter.types';
import { COUNTER_ACTIONS } from './counter.actions';
import { LIST_NUMBERS } from '../../utils/messageResponse';

const COUNTER_STATUS: Record<number, string> = {
  0: 'en progreso',
  1: 'completado',
  2: 'detenido',
};

export const counterModel: Model = {
  title: {
    type: 'string',
    required: true,
  },
  description: 'string',
  count: 'number',
  status: {
    type: 'number',
    required: true,
  },
  completition_date: 'string',
  reset_counter: 'string',
};

export function transformCounterAPIMessage(
  response: CounterResponse | CounterResponse[],
  action: string
) {
  let message = '';
  if (action === COUNTER_ACTIONS.GET_ALL && Array.isArray(response)) {
    message = response.reduce((acc, counter, currentIndex) => {
      acc += `${LIST_NUMBERS[currentIndex + 1]}\n*Título:* ${
        counter.title
      }\n*Descripción:* ${counter.description}\n*Contador:* ${
        counter.count
      }\n*Mensaje:* ${counter.message}\n*Estado:* ${
        COUNTER_STATUS[counter.status]
      }\n*Contador de reinicios:* ${counter.reset_counter}\n\n`;
      return acc;
    }, 'Lista de contadores:\n\n');
  } else if (action === COUNTER_ACTIONS.GET_ONE && !Array.isArray(response)) {
    message = `${response.message.replace('[count]', String(response.count))}`;
  }
  return message;
}
