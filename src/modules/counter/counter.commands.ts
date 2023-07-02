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

export const COUNTER_MESSAGE: MessageArray = [
  {
    command: 'counter create',
    method: counterCreate,
  },
  {
    command: 'counter remove',
    method: counterRemove,
  },
  {
    command:
      /^counter\s(?!(?:list|create|remove|reset|set|add|decrement|help)\b)\w+$/i,
    method: counterGet,
  },
  {
    command: 'counter list',
    method: counterList,
  },
  {
    command: 'counter reset',
    method: counterReset,
  },
  {
    command: 'counter set',
    method: counterSet,
  },
  {
    command: 'counter add',
    method: counterAdd,
  },
  {
    command: 'counter subtract',
    method: counterSubtract,
  },
  {
    command: 'counter help',
    method: counterHelp,
  },
];
