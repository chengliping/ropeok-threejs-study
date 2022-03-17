/**
 * 入口文件配置
 * @type {string}
 */
const ENV = process.env.NODE_ENV;
let appEntry;
if (ENV === 'production') {
  appEntry = './src/main/production.js';
} else {
  appEntry = './src/main/dev.js';
}
module.exports = appEntry;
