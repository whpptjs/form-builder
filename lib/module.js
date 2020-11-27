const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['@whppt/form-builder'],
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: '@whppt/form-builder.js',
    options
  })
}

module.exports.meta = require('../package.json')
