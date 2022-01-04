type EnvValue = string | number | boolean;
interface EnvOptions {
  devDefault?: EnvValue | EnvValue[];
  isBoolean?: boolean;
  optional?: boolean;
  isArray?: boolean;
  isNumber?: boolean;
  separator?: string;
}

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

  if (options.isArray && isString) {
    return envValue.split(options.separator || ',').map(trimElements);
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

export const getStringEnv = (key: string, options: EnvOptions = {}): string | undefined => {
  return getEnvVar(key, {
    ...options,
    isNumber: false,
    isBoolean: false,
    isArray: false
  }) as string;
};

export const getNumericEnv = (key: string, options: EnvOptions = {}): number | undefined => {
  return getEnvVar(key, {
    ...options,
    isNumber: true,
    isBoolean: false,
    isArray: false
  }) as number;
};

export const getBoolEnv = (key: string, options: EnvOptions = {}): boolean | undefined => {
  return getEnvVar(key, {
    ...options,
    isNumber: false,
    isBoolean: true,
    isArray: false
  }) as boolean;
};

export const getArrayEnv = <T>(key: string, options: EnvOptions = {}): Array<T> | undefined => {
  return getEnvVar(key, {
    ...options,
    isArray: true
  }) as unknown as Array<T>;
};

export default getEnvVar;
