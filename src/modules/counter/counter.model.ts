import { Model } from '../../types/model';
import { CounterAPI, CounterResponse } from './counter.types';
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
  response: CounterResponse | CounterAPI,
  action: string
) {
  let message = '';
  if (
    action === COUNTER_ACTIONS.GET_ALL &&
    Array.isArray((response as CounterAPI).items)
  ) {
    const responseHelper = response as CounterAPI;
    const responsePaginator = responseHelper.paginator;
    message = responseHelper.items.reduce((acc, counter, currentIndex) => {
      acc += `${LIST_NUMBERS[currentIndex + 1]}\n*Título:* ${
        counter.title
      }\n*Descripción:* ${counter.description}\n*Contador:* ${
        counter.count
      }\n*Mensaje:* ${counter.message}\n*Estado:* ${
        COUNTER_STATUS[counter.status]
      }\n*Contador de reinicios:* ${counter.reset_counter}\n\n`;
      return acc;
    }, `Lista de contadores (mostrando contadores del ${responsePaginator.pagingCounter} al ${responsePaginator.currentPage === responsePaginator.totalPages ? responsePaginator.totalItems : responsePaginator.currentPage * responsePaginator.limit}):\n\n`);

    message = message.concat(
      `*Para ver la siguiente página, usa el comando* "!counter list`
    );
  } else if (action === COUNTER_ACTIONS.GET_ONE && !Array.isArray(response)) {
    message = `${(response as CounterResponse).message.replace(
      '[count]',
      String((response as CounterResponse).count)
    )}`;
  }
  return message;
}
