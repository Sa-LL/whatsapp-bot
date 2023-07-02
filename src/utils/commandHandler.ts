import { Message, MessageArray } from 'types/message';

export const commandHandler = (
  message: string,
  model: MessageArray
): Message => {
  return model.find((command) => {
    if (
      typeof command.command === 'string' ||
      command.command instanceof String
    )
      return message.startsWith(command.command as string);
    return (command.command as RegExp).test(message);
  });
};
