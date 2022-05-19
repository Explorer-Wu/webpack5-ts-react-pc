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
  /**
   * true: 输入文件的文件名，是相对于 context 选项。
   * false: webpack 不会更改 __filename 的代码。在 Node.js 环境中运行时，出文件的文件名。
   * 'mock': value 填充为 'index.js'。
   * 'warn-mock': 使用 '/index.js' 但是会展示一个警告。
   * 'eval-only'
   */
  __filename: false,
  /**
   * true: 输入 文件的目录名，是相对于 context 选项。
   * false: webpack 不会更改 __dirname 的代码，这意味着你有常规 Node.js 中的 __dirname 的行为。在 Node.js 环境中运行时，输出 文件的目录名。
   * 'mock': value 填充为 '/'。
   * 'warn-mock': 使用 '/' 但是会显示一个警告。
   * 'eval-only'
   */
  __dirname: false,
};
