import { Message } from 'whatsapp-web.js';

export const handleMessage = (message: Message): string | null => {
  if (typeof message.body !== 'string' || !message.body.startsWith('!'))
    return null;
  return 'pong';
};
