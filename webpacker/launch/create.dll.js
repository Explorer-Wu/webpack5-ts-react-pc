"use strict";
require("./check-versions")();

// process.env.NODE_ENV = 'development'

const ora = require("ora");
const rm = require("rimraf");
// const chalk = require('chalk')
const chalk = require("react-dev-utils/chalk");
const Webpack = require("webpack");
// const envConfig = require('../env')
const utils = require("../utils");

const dllWebpackConfig = require("../config/webpack.dll.config");

const spinnerDll = ora({
  color: "green",
  text: "Dll生产中..."
});
spinnerDll.start();

rm(utils.resolve("libs"), err => {
  if (err) throw err;

  // 导入的 webpack 函数需要传入一个 webpack 配置对象，当同时传入回调函数时就会执行 webpack compiler：
  Webpack(dllWebpackConfig, (err, stats) => {
    spinnerDll.stop();
    // 处理错误
    if (err) throw err;

    const info = stats.toJson();

    process.stdout.write(
      stats.toString({
        colors: true, // 在控制台展示颜色
        modules: false,
        children: false,
        chunks: false, // 使构建过程更静默无输出
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      console.log(chalk.red("  Dll failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Dll succeed!.\n"));
    process.exit(0);
  });
});
