import { MessageArray } from 'types/message';
import {
  counterCreate,
  counterSubtract,
  counterGet,
  counterHelp,
  counterAdd,
  counterList,
  counterRemove,
  counterReset,
  counterSet,
} from './counter.controller';

export const COUNTER_ROOT = 'counter';

export const COUNTER_COMMANDS: Record<string, string> = {
  CREATE: `${COUNTER_ROOT} create`,
  REMOVE: `${COUNTER_ROOT} remove`,
  GET: `${COUNTER_ROOT}`,
  LIST: `${COUNTER_ROOT} list`,
  RESET: `${COUNTER_ROOT} reset`,
  SET: `${COUNTER_ROOT} set`,
  ADD: `${COUNTER_ROOT} add`,
  SUBTRACT: `${COUNTER_ROOT} subtract`,
  HELP: `${COUNTER_ROOT} help`,
};

export const COUNTER_MESSAGE: MessageArray = [
  {
    command: COUNTER_COMMANDS.CREATE,
    method: counterCreate,
  },
  {
    command: COUNTER_COMMANDS.REMOVE,
    method: counterRemove,
  },
  {
    command:
      /^counter\s(?!(?:list|create|remove|reset|set|add|decrement|help)\b).+$/i,
    method: counterGet,
  },
  {
    command: COUNTER_COMMANDS.LIST,
    method: counterList,
  },
  {
    command: COUNTER_COMMANDS.RESET,
    method: counterReset,
  },
  {
    command: COUNTER_COMMANDS.SET,
    method: counterSet,
  },
  {
    command: COUNTER_COMMANDS.ADD,
    method: counterAdd,
  },
  {
    command: COUNTER_COMMANDS.SUBTRACT,
    method: counterSubtract,
  },
  {
    command: COUNTER_COMMANDS.HELP,
    method: counterHelp,
  },
];
