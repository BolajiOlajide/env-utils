# ENV Utils

[![Env Util CI (Pull Requests)](https://github.com/BolajiOlajide/env-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/BolajiOlajide/env-utils/actions/workflows/ci.yml)

Easily Get Environment Variables

## Install

```sh
yarn add @bolajiolajide/env-utils
```

## getEnvVar

Gets an environment variable. This returns an error if the environment variable isn't detected.

```js
import getEnvVar from 'env-utils';

getEnvVar(envVarName, options);
```

### Options

* `options.isBoolean` - Forces the value to be a boolean

```js
// returns true if the variable is 'true' else it returns false
const shouldAcceptCoins = getEnvVar('SHOULD_ACCEPT_COINS', { boolean: true });
```

* `options.isArray` - If your env variable is a comma separated string you can get back an array instead.

```js
// process.env.PORTS = '8080,9000,3000'
const PORTS = getEnvVar('PORTS', { isArray: true }); // returns ['8080', '9000', '3000'];
```

In the event that the variable is separated by something other than a comma, you can define the separator using `options.separator`.

```js
// process.env.PORTS = '8080&9000&3000'
const PORTS = getEnvVar('PORTS', { isArray: true, separator: '&' }); // returns ['8080', '9000', '3000'];
```

* `options.devDefault` - used to specify a development-environment-only fallback for the variable. If the variable is undefined, the `devDefault` is returned in it's stead.
This only applies when `process.env.NODE_ENV === 'development'`. Any other value of `NODE_ENV` will not regard this option

```js
const PORT = getEnvVar('PORT', { devDefault: '1234'});
// if process.env.PORT is not set, the value of PORT will be `1234`
```

* `options.optional` - Used to identify variables that are optional. This is specifically useful when you don't want an error thrown for undefined variables.

```js
const SOMETHING = getEnvVar('SOMETHING', { optional: true });

// if process.env.SOMETHING is undefined, the value of SOMETHING will be undefined.
// else it'll be whatever the value of process.env.SOMETHING is
```

* `options.isNumber` - used to convert numeric-like variables into number. Note: This will throw an error if it's true and the variable isn't numeric-like.

```js
// if process.env.PORT = '8080'
const PORT = getEnvVar('PORT', { isNumber: true }); // returns 8080

// if process.env.PORT = 'smash' - not a valid number
const PORT = getEnvVar('PORT', { isNumber: true }); // this will result in an error being thrown
```

### Lazy Fetching an environment variable

You can lazy fetch an environment variable using the function below, it's a result of composing the `getEnvVar` method:

```js
const lazyGetEnvVar = (...args) => () => getEnvVar(...args);
```

#### Utility Functions

`env-utils` exports some utility functions that return `variables` in a certain type. This is especially useful for typescript projects, so you don't have to deal with type casting with the `as` keyword.

Below is an example:

```ts
import getEnvVar, { getStringEnv, getNumericEnv } from '@bolajiolajide/env-utils';

getEnvVar('SENTRY_DSN') // returns a value of type EnvValue | EnvValue[] | undefined
// you'd need to manually type cast to a string `getEnvVar('SENTRY_DSN') as string` to avoid ts errror

/*
 * You can make use of the utility functions and they return the appropriate types
*/
getStringEnv('SENTRY_DSN') // will always return a string | undefined
```

N.B All utility functions have exactly the same signature as the `getEnvVar` function, along with some overrides that ensures that there are no implicit type conversion/casting.

* `getStringEnv` returns an environment variable as a string
* `getArrayEnv<T>` returns an environment variable as an array, can be passed a generic to identify the type of the array's content
* `getBoolEnv` returns an environment variable as a boolean
* `getNumericEnv` returns an environment variable as a number

This works great with the [lazy-config](https://github.com/BolajiOlajide/lazy-config) module.
Hello World
