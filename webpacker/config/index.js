const path = require("path");
const httpProxyTarget = {
  port: 3681, // 80
  protocol: 'http',
};

const httpsProxyTarget = {
  port: 3683, // 443
  protocol: 'https',
};

module.exports = {
  dev: {
    env: require("./dev.env"),
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/", // `//localhost:3603/`,
    proxyTable: {
      "/api/": {
        target: `${httpProxyTarget.protocol}://172.0.0.1:${httpProxyTarget.port}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
        // onProxyReq: function(proxyReq, req, res) {
        //   // add custom header to request
        //   proxyReq.setHeader('Cookie', 'username=wuwh; sessionid=xxxxx');
        //   // or log the req
        // }
      },
      "/auth": {
        target: `${httpsProxyTarget.protocol}://172.0.0.1:${httpsProxyTarget.port}`,
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      }
    },
    // Various Dev Server settings
    host: "localhost", // '0.0.0.0', // can be overwritten by process.env.HOST
    port: 3603, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    // {
    //   app: ["Google Chrome", "--incognito", "--other-flag"] //隐身窗口
    // },
    errorOverlay: true,
    notifyOnErrors: true,
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
    index: path.resolve(__dirname, "../dist/index.html"),
    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
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
    productionGzip: true,
    productionGzipExtensions: ["js", "jsx", "css", "less", "sass"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: true //process.env.npm_config_report
  }
};