'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'development'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
// const chalk = require('chalk')
const chalk = require('react-dev-utils/chalk');
const Webpack = require('webpack')
// const config = require('../env')
const utils = require('../utils')

const dllWebpackConfig = require('../config/webpack.dll.config')

const spinnerDll = ora({
  color: 'green',
  text: 'Dll生产中...'
});
spinnerDll.start()

rm(utils.resolve('libs/'), err => {
  if (err) throw err
  Webpack(dllWebpackConfig, (err, stats) => {
    spinnerDll.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Dll failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Dll succeed!.\n'))
  })
})