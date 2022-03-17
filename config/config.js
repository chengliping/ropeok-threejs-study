const target = 'default';
let config;
const commonConfig = require('./common-config');
const _ = require('lodash');
if (target === 'default') {
  config = require('./default-config');
}
const exportConfig = _.merge(commonConfig, config);
module.exports = exportConfig;
