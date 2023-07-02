import { Model } from 'types/model';

export const modelToCommand = (model: Model) => {
  const entries = Object.entries(model);
  return entries
    .map(([key, value]) => {
      if (typeof value === 'string') return `<${key}>`;
      if (typeof value === 'object')
        return value.required ? `<${key}>` : `[${key}]`;
    })
    .join(' ');
};
