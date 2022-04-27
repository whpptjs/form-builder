const { resolve, join } = require('path');
const glob = require('glob');
const meta = require('../package.json');

export default function (moduleOptions) {
  const filesDir = 'whppt/form-builder';

  const options = { ...moduleOptions };

  this.addPlugin({
    src: resolve(__dirname, 'nuxt_plugin.js'),
    fileName: join(filesDir, 'whppt-form-builder.js'),
    options,
  });

  this.addTemplate({
    src: resolve(__dirname, 'whppt_plugin.js'),
    fileName: join(filesDir, 'whppt_plugin.js'),
    options,
  });

  copyDirectory(this, filesDir, 'components', options);
}

export { meta };

function copyDirectory(module, filesDir, dir, options = {}) {
  const pattern = `${__dirname}/${dir}/**/*.{js,vue,scss}`;
  const directoryOptions = {
    ignore: [],
  };

  const files = glob.sync(pattern, directoryOptions);

  for (const file of files) {
    module.addTemplate({
      src: file,
      fileName: join(filesDir, file.replace(`${__dirname}/`, '')),
      options,
    });
  }
}
