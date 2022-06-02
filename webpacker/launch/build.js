"use strict";
require("./check-versions")();
process.env.NODE_ENV = "production";

const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
// const chalk = require('chalk')
const chalk = require("react-dev-utils/chalk");
const Webpack = require("webpack");
const envConfig = require("../env");
const webpackProdConfig = require("../config/webpack.prod.config");

const spinner = ora("生产环境构建打包中...");
// 启动终端旋转器
spinner.start();

rm(path.join(envConfig.build.assetsRoot, envConfig.assetsSubDirectory), err => {
  if (err) throw err;

  // console.log("webpackProdConfig:", webpackProdConfig)
  Webpack(webpackProdConfig, (err, stats) => {
    // 停止并清除转轮
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
