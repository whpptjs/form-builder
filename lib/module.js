const { resolve, join } = require('path');

module.exports = function (moduleOptions) {
  const filesDir = 'whppt/form-builder';

  const options = {
    ...this.options.whpptFormBuilder,
    ...moduleOptions,
  };

  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: join(__dirname, 'components'),
      prefix: 'wfb-',
    });
  });

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: join(filesDir, 'whppt-form-builder.js'),
    options,
  });

  this.addPlugin({
    src: resolve(__dirname, 'plugins/customFormPlugin.js'),
    fileName: join(filesDir, 'plugins/customFormPlugin.js'),
    options,
  });

  this.addPlugin({
    src: resolve(__dirname, 'plugins/formFieldPlugin.js'),
    fileName: join(filesDir, 'plugins/formFieldPlugin.js'),
    options,
  });

  this.addTemplate({
    src: resolve(__dirname, 'components/CustomForm/Editors/CustomFormEditor.vue'),
    fileName: join(filesDir, 'components/CustomForm/Editors/CustomFormEditor.vue'),
    options,
  });

  this.addTemplate({
    src: resolve(__dirname, 'components/CustomForm/Editors/FormFieldEditor.vue'),
    fileName: join(filesDir, 'components/CustomForm/Editors/FormFieldEditor.vue'),
    options,
  });
};

module.exports.install = (Vue, options) => require('./install').default(Vue, options);
module.exports.meta = require('../package.json');
