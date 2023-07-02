export type ListNumber = Record<number, string>;

export type Message = {
  command: string | RegExp;
  method: (message?: string) => Promise<string>;
};

export type MessageArray = Array<Message>;
