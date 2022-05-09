
const path = require("path");
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const config = require("../env");

module.exports = {
  // static: {
  //   publicPath: '/',
  // },
  clientLogLevel: "warning",
  // client: {
  //   overlay: false,
  // },
  historyApiFallback: {
    rewrites: [
      {
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
      },
    ],
  },
  hot: true,
  // lazy: true,
  /** inline模式：向网页中注入代理客户端代码，通过客户端发起刷新。向每个chunk中都注入客户端代码，当要输出很多chunk，会导致构建变慢。
   * 关闭inline模式减少构建时间。
   **/
  inline: true,
  //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
  contentBase: false, //设置为 false 以禁用 contentBase。 默认情况下，将使用当前工作目录作为提供内容的目录，如：[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]。
  compress: true, // gzip压缩
  host: HOST || config.dev.host,
  port: PORT || config.dev.port,
  open: config.dev.autoOpenBrowser,
  overlay: config.dev.errorOverlay
    ? { warnings: false, errors: true }
    : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  quiet: false, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: config.dev.poll,
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  watchContentBase: false,
  liveReload: false,
  disableHostCheck: true,
};
