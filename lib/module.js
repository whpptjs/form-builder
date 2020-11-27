const { resolve, join } = require('path');
const glob = require('glob');

module.exports = function (moduleOptions) {
  const filesDir = 'whppt/layouts';

  const options = {
    ...this.options['@whppt/form-builder'],
    ...moduleOptions,
  };

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: join(filesDir, 'whppt-form-builder.js'),
    options,
  });

  const copyDirectory = function (dir) {
    // eslint-disable-next-line node/no-path-concat
    const pattern = `${__dirname}/${dir}/**/*.{js,vue,scss}`;
    const directoryOptions = {
      ignore: [],
    };

    const files = glob.sync(pattern, directoryOptions);

    for (const file of files) {
      self.addTemplate({
        src: file,
        // eslint-disable-next-line node/no-path-concat
        fileName: join(filesDir, file.replace(`${__dirname}/`, '')),
        options,
      });
    }
  };

  copyDirectory('components');
};

module.exports.meta = require('../package.json');
