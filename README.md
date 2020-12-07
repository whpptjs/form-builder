# @whppt/form-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Whppt form builder modules for use with the nuxt framework, @whppt/nuxt and @whppt/api-express

[📖 **Release Notes**](./CHANGELOG.md)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

## Features
- Simple Form creation and integration with core Whppt modules to easily build forms and send them via select services.

## Installation
1. Add `@whppt/form-builder` dependency to your project

```bash
yarn add @whppt/form-builder # or npm install @whppt/form-builder
```

2. Add `@whppt/form-builder` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@whppt/form-builder',

    // With options
    ['@whppt/form-builder', { /* module options */ }]
  ]
}
```

3. Make a few updates to your `~/nuxt.config.js` file.
```js
export default {
  build: {
    transpile: ['@whppt/layouts'],
  },
}
```

## Usage

### Adding in the API module
~/server/index.js
```js
const express = require('express');
const Whppt = require('@whppt/api-express');

/* Import/require the api module from @whppt/form-builder */
const forms = require('@whppt/form-builder/lib/api');

/* Add the module to the options that will be passed to @whppt/api-express */
const options = {
  modules: {
    forms,
  },
};

const app = express();

Whppt(options).then(whppt => app.use(whppt));

module.exports = app;
```

### Registering the component with @whppt/nuxt
Inside any whppt plugin that you wish to use the form-builder component on add the following
```js
/* Import/require the Form definition from @whppt/form-builder, this is a whppt component */
import { Form } from '@whppt/form-builder/lib/components';

export default {
  name: 'MyPlugin',
  pageType: {
    name: 'my-plugin',
    label: 'My Plugin',
    collection: { name: 'my-plugin-collection' },
    components: {
      /* Register the Form definition to this plugin, this will now show up as a usable component on the template */
      Form,
    },
  },

};

```


### Setting up Google recaptcha (Optional)
This module leverages [vue-recaptcha](https://github.com/DanSnow/vue-recaptcha) for fast setup and working Google Recaptcha. Don't forget to star their repo on github as well!

1. Add in the siteKey option where you register the module (see [options](#options) for more info)
```js
{
  modules: {
    ['@whppt/form-builder', { siteKey: 'my-google-site-key' }]
  }
}
```

2. Add in the env variable `RECAPTCHA_SECRET` (see [options](#options) for more info)
```dotenv
RECAPTCHA_SECRET=MySuperSecretRecaptchaSecretForMyEyesOnly
```

## Options

### Module Options

| Option   | default   | Required | type   | Description |
| ---------|-----------|----------|--------|-------------|
| siteKey  | undefined | false    | string | Google reCAPTCHA V2 sitekey, can be found/generated [here](https://developers.google.com/recaptcha). This is required to use the recaptcha field. | 

### Env Variables
| Option           | default   | Required | Description |
| -----------------|-----------|----------|-------------|
| RECAPTCHA_SECRET | undefined | false    | Google reCAPTCHA V2 secret key, can be found/generated [here](https://developers.google.com/recaptcha). This is required to use the recaptcha field. | 


## License

[MIT License](./LICENSE)

Copyright (c) lucas <info@sveltestudios.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@whppt/form-builder/latest.svg
[npm-version-href]: https://npmjs.com/package/@whppt/form-builder

[npm-downloads-src]: https://img.shields.io/npm/dt/@whppt/form-builder.svg
[npm-downloads-href]: https://npmjs.com/package/@whppt/form-builder

[github-actions-ci-src]: https://github.com//workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com//actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/.svg
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/@whppt/form-builder.svg
[license-href]: https://npmjs.com/package/@whppt/form-builder
