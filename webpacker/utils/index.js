
const path = require('path')
const config = require('../env')

module.exports = {
  mode: process.env.NODE_ENV, // ?? 'production',
  // isDevServer: process.env.WEBPACK_IS_DEV_SERVER === 'true',
  isProd: ['production', 'uat', 'test'].includes(process.env.NODE_ENV),
  isDev: !exports.isProd,
  resolve: (dir) => path.join(__dirname, '..', dir),
  pathRewrite: (localUrl, remoteUrl) => path.replace(new RegExp(localUrl.replace('/', '\\/'), 'g'), remoteUrl),
  assetsPath: function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory
  
    return path.posix.join(assetsSubDirectory, _path)
  },
  // rootDir: path.join(__dirname, '../../'),
  // webpackDir: path.join(__dirname, '../'),
  arrFilterEmpty: (array) => array.filter((x) => !!x),
  sassResourceItems: []
}
