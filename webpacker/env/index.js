'use strict'
const path = require("path");
const { merge } = require('webpack-merge')
const { resolve } = require("../utils/index");
const reactConfig = require('../../react-cli.config')

module.exports = merge({
  assetsSubDirectory: "static",
  dev: {
    env: require("./dev.env"),
    // Paths
    assetsSubDirectory: "./static",
    assetsPublicPath: "/", // `//localhost:3603/`,
    proxyTable: {
      "/api": {
        target: 'http://172.0.0.1:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },
    },
    // Various Dev Server settings
    host: "localhost", // '0.0.0.0', // can be overwritten by process.env.HOST
    port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    // {
    //   app: ["Google Chrome", "--incognito", "--other-flag"] //隐身窗口
    // },
    errorOverlay: true,
    notifyOnErrors: true,
    // watchOptions
    poll: false,
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    /**
     * Source Maps
     */
    devtool: "cheap-module-eval-source-map", //在大多数情况下，最佳选择
    // 'eval-source-map', 变体配置进行增量编译
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    env: require("./prod.env"),
    // Template for index.html
    index: resolve("dist/index.[contenthash].html"),
    // Paths
    assetsRoot: resolve("./dist"),
    assetsSubDirectory: "./static",
    assetsPublicPath: "/",
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map", // 'cheap-module-source-map' 'cheap-source-map' 转换过的代码（仅限行）

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "jsx", "css", "less", "sass", "html"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: true // process.env.npm_config_report
  },

  // 默认禁用多进程打包
  useWorkerPool: false,
  // 默认使用CDN
  useCDN: true,
}, reactConfig);
