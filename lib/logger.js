const Debug = require('debug');

module.exports = {
  info: Debug('whppt-forms:info'),
  error: Debug('whppt-forms:error'),
  warning: Debug('whppt-forms:warning'),
  dev: Debug('whppt-forms:dev'),
};
