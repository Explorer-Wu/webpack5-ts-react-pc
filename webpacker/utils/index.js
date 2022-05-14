
const path = require('path');
const fs = require('fs');
const config = require('../env');
const packageConfig = require('../../package.json');
// process.cwd() 方法返回的是 Node.js 进程的当前工作目录(即，当前脚本的工作目录的路径)，通常是package.json 文件所在目录，因为包含 process.cwd() 的脚本是在 package.json 中读取执行的
const appDir = fs.realpathSync(process.cwd())

module.exports = {
  mode: process.env.NODE_ENV, // ?? 'production',
  // isDevServer: process.env.WEBPACK_IS_DEV_SERVER === 'true',
  isProd: ['production', 'uat', 'test'].includes(process.env.NODE_ENV),
  isDev: !exports.isProd,
  resolve: (relativePath) => path.resolve(appDir, relativePath), // 获取绝对路径
  /**__dirname 返回的是当前模块的目录名称，即：被执行的 JavaScript 文件所在目录路径
   * __dirname是官方文档在 Globals 里的全局变量，但实际上 __dirname 是每个模块内部的，并不是真正意义上的全局变量
   **/
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
