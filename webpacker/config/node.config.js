//每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一
// 尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
module.exports = {
  /** global设置
   * true: 提供 polyfill
   * false: 不提供任何 polyfill。代码可能会出现 ReferenceError 的崩溃
   * 'warn': 当使用 global 时展示一个警告
  */
  global: true,
  // boolean 'mock' | 'warn-mock' | 'eval-only'
  __filename: false,
  __dirname: false,
  // prevent webpack from injecting useless setImmediate polyfill
  // because source contains it (although only uses it if it's native).
  setImmediate: true, //boolean | "mock" | "empty"
  // prevent webpack from injecting mocks to Node native modules
  // that does not make sense for the client
  // "mock"：提供 mock 实现预期接口，但功能很少或没有。
  // "empty"：提供空对象。
  module: "empty",
  dgram: "empty",
  dns: "mock",
  fs: "empty",
  http2: "empty",
  net: "empty",
  tls: "empty",
  process: "mock",
  child_process: "empty"
  // path: true,
  // url: false
};
