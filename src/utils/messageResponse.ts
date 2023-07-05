import { ListNumber } from '../types/message';

/**
 * Split a string by spaces, but ignore spaces inside quotes
 */
const SPLIT_REGEX: RegExp = /(?=(?:[^"]*"[^"]*")*[^"]*$)\s+/;

export function handleMessageParameters(
  message: string,
  root: string
): string[] {
  const messageArray = message.split(`${root} `);
  if (messageArray.length > 1)
    return messageArray[1].split(SPLIT_REGEX).map((item) =>
      //remove quotes
      item.replace(/['"]+/g, '')
    );
  return [];
}

export const LIST_NUMBERS: ListNumber = {
  0: '0️⃣',
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
  10: '🔟',
};

function stringToParams(message: string) {
  const regex = /(\w+)=("[^"]+"|\w+)/g;
  const matches = message.matchAll(regex);
  const resultado: { param: string; value: string }[] = [];

  for (const match of matches) {
    const param = match[1];
    const value = match[2].replace(/"/g, '');
    resultado.push({ param, value });
  }

  return resultado;
}

function paramsToQueryString(params: { param: string; value: string }[]) {
  return params.map((param) => `${param.param}=${param.value}`).join('&');
}

/**
 * Function to transform a message to a query string using the format:
 * param1=value1&param2=value2
 * @param message
 * @returns
 */
export function handleMessageQuery(message: string) {
  const params = stringToParams(message);
  const queryString = paramsToQueryString(params);
  return queryString;
}
