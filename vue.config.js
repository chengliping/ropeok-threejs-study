// vue.config.js
const FileManagerPlugin = require('filemanager-webpack-plugin'); // 生成dist.zip
const ThreeExamples = require('import-three-examples');
const entryConfig = require('./config/entry-config');
const config = require('./config/config');
const path = require('path');
let buildPath;
if (config.buildTarget === 'demo') {
  buildPath = path.resolve(__dirname, './demo/dist');
} else {
  buildPath = path.resolve(__dirname, './dist');
}
module.exports = {
  productionSourceMap: false,
  publicPath: '',
  pages: {
    index: {
      // page 的入口
      entry: entryConfig

    }
  },
  outputDir: buildPath,
  parallel: false,
  pluginOptions: {
    ThreeExamples
  },
  chainWebpack (webpackConfig) {
    webpackConfig.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .tap(() => {
        return {
          inline: true,
          fallback: false,
          name: '[name]:[hash:8].js'
        };
      })
      .end();
  },
  devServer: {
    proxy: {
      '/local-api': {
        target: 'http://localhost:10999',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onEnd: {
            delete: [`./${buildPath}.zip`],
            archive: [{
              source: path.join(__dirname, `./${buildPath}.zip`),
              destination: path.join(__dirname, `./${buildPath}.zip`)
            }]
          }
        }
      })
    ]
  }
};
