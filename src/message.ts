import { commandsSearcher } from './commands';
import { Message } from 'whatsapp-web.js';

export const handleMessage = async (message: Message): Promise<string> => {
  if (typeof message.body !== 'string' || !message.body.startsWith('!'))
    return null;
  return await commandsSearcher(message.body.split('!')[1]);
};
