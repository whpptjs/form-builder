const Debug = require('debug');

module.exports = {
  info: Debug('whppt:info'),
  error: Debug('whppt:error'),
  warning: Debug('whppt:warning'),
  dev: Debug('whppt:dev'),
};
