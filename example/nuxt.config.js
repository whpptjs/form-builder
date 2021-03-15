export default {
  target: 'server',
  // srcDir: 'example',
  publicRuntimeConfig: {
    recaptcha_sitekey: process.env.RECAPTCHA_SITEKEY,
  },
  buildModules: ['@nuxtjs/eslint-module', ['@nuxtjs/dotenv', { path: './' }]],
  modules: [['../lib/module', { siteKey: process.env.RECAPTCHA_SITEKEY }], '@whppt/nuxt'],
  whppt: {
    defaultMargin: { top: { base: 0, sm: 0, lg: 0 }, bottom: { base: 2, sm: 2, lg: 2 } },
  },
  transpile: ['@whppt/nuxt'],
  // serverMiddleware: { '/': '../server' },
};
