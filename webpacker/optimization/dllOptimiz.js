const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const envConfig = require('../env');
const { useWorkerPool } = require('../env');

console.log("envConfig:", envConfig);

exports.dllOptimiz = {
  // 在production模式，minimize默认为true，效果就是压缩混淆js代码。
  minimize: true,
  // 在构建时新增压缩配置
  minimizer: [
    // This is only used in production mode
    new CssMinimizerPlugin({
      // 启用/禁用多进程并发执行,或者设置并发数
      parallel: useWorkerPool,
    }),
    // 配置生产环境的压缩方案：js和css
    new TerserPlugin({
      /** 启用/禁用多进程并发运行功能
       * 类型： Boolean|Number 默认值： true.
       * 使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 
      */
      parallel: useWorkerPool, // 4
      exclude: /\/node_modules\//,
      terserOptions: {
        // ecma: undefined,
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        // Deprecated
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
        // format: null,
        // toplevel: false,
        // nameCache: null,
        // keep_classnames: undefined,
        // keep_fnames: false,
        ie8: false,
        safari10: true,
      },
      // 启用/禁用剥离注释功能
      extractComments: true,
    }),
  ],
  // 如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。
  sideEffects: true, //打开移除未使用的模块
};