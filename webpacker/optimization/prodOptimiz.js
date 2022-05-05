const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

exports.prodOptimiz = {
  // 在production模式，minimize默认为true，效果就是压缩混淆js代码。
  minimize: true,
  // 在构建时新增压缩配置
  minimizer: [
    // This is only used in production mode
    new CssMinimizerPlugin({
      // 启用/禁用多进程并发执行,或者设置并发数
      parallel: 6, // true
    }),
    // This is only used in production mode
    new TerserPlugin({
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
      parallel: 6, // true
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      // Enable file caching
      cache: true,
      // sourceMap: shouldUseSourceMap,
      sourceMap: true,
    }),
  ],
  // 可以考虑将 optimization.moduleIds 和 optimization.chunkIds在配置中移除, 使用默认值会更合适，因为默认值会在 production 模式 下支持长效缓存且可以在 development 模式下进行调试。
  /** optimization.chunkIds 的默认值是 false(optimization.moduleIds同样)：
   * 如果环境是开发环境，那么 optimization.chunkIds 会被设置成 'named'，但当在生产环境中时，它会被设置成 'deterministic'
   * 如果上述的条件都不符合, optimization.chunkIds 会被默认设置为 'natural'
   **/ 
  // chunkIds: false,
  /** 让公共包 splitChunks 的 hash 不因为新的依赖而改变，减少非必要的 hash 变动
   * 通过配置 contenthash/hash，浏览器缓存了未改动的文件，仅重新加载有改动的文件，大大加快加载速度。
   **/
  // moduleIds: 'deterministic',

  // Automatically split vendor and commons
  splitChunks: {
    // include all types of chunks
    chunks: 'all',
    // 拆分 chunk 的名称。设为 false 将保持 chunk 的相同名称，因此不会不必要地更改名称。这是生产环境下构建的建议值。
    name: false,
    // 重复打包问题
    cacheGroups:{
      defaultVendors:{ // node_modules里的代码
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        // 设置 chunk id 的提示。 它将被添加到 chunk 的文件名中
        idHint: 'vendors',
        // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）
        priority: 10,
        // 告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此缓存组创建 chunk
        enforce: true
      }
    }
  },
  // Keep the runtime chunk separated to enable long term caching
  runtimeChunk: true,
  concatenateModules: true,
};