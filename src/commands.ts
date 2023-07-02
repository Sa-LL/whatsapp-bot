import { COUNTER_MESSAGE } from './modules/counter/counter.commands';
import { commandHandler } from './utils/commandHandler';

export const commandsSearcher = async (message: string): Promise<string> => {
  let command = commandHandler(message, COUNTER_MESSAGE);
  if (command) {
    return await command.method(message).then((response) => response);
  }
  return null;
};
