# @whppt/form-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Whppt form builder modules for use with the nuxt framework

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

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

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) lucas <lucas@sveltestudios.com>

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
