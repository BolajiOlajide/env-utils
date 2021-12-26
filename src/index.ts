import type { EnvOptions, EnvValue } from './types';


const trimElements = (element: string) => element.trim();

const getEnvVar = (key: string, options: EnvOptions = {}): EnvValue | EnvValue[] | undefined => {
  const fallback = process.env['NODE_ENV'] === 'development' ? options.devDefault : undefined;
  const envValue = process.env[key] || fallback;

  const isUndefined = typeof envValue === 'undefined';
  const isString = typeof envValue === 'string';

  if (isUndefined && !options.optional) {
    throw Error(`key: "${key}" is undefined`);
  }

  if (options.isBoolean && isString) {
    return envValue === 'true';
  }

  if (options.commaSeparated && isString) {
    return envValue.split(options.commaSeparator || ',').map(trimElements);
  }

  if (options.isNumber && isString) {
    const numericEnvValue = parseInt(envValue, 10);

    if (isNaN(numericEnvValue)) {
      throw new Error(`key: "${key}" is not a valid number`);
    }

    return numericEnvValue;
  }

  return envValue;
};

export default getEnvVar;
