
const path = require('path')
const config = require('../env')
const packageConfig = require('../../package.json')

module.exports = {
  mode: process.env.NODE_ENV, // ?? 'production',
  // isDevServer: process.env.WEBPACK_IS_DEV_SERVER === 'true',
  isProd: ['production', 'uat', 'test'].includes(process.env.NODE_ENV),
  isDev: !exports.isProd,
  resolve: (dir) => path.resolve(dir), // 获取绝对路径， /斜杠代表根目录 
  join: (dir, tier = '..') => path.join(__dirname, tier, dir), // 连接路径
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
  sassResourceItems: [],
  createNotifierCallback: () => {
    const notifier = require('node-notifier')
  
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }
}
