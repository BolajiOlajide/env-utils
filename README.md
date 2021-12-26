# ENV Utils

[![Env Util CI (Pull Requests)](https://github.com/BolajiOlajide/env-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/BolajiOlajide/env-utils/actions/workflows/ci.yml)

Easily Get Environment Variables

## Install

```sh
yarn add @bolajiolajide/env-utils
```

## Methods

### getEnvVar

gets an environment variable

```js
import {getEnvVar} from 'env-utils'
const PORT = getEnvVar('PORT')
```

You can force the value to be a boolean

```js
const PORT = getEnvVar('PORT', { boolean: true })
```

And if your env variable is a comma separated string you can get back an array instead

```js
const PORT = getEnvVar('PORT', { commaSeparated: true })
```

You can also set a fallback value for development mode

```js
const PORT = getEnvVar('PORT', { devDefault: '1234'})
```
