

const { ProvidePlugin } = require('webpack');

const config = {
  // _: "lodash",
  // 只获取 lodash 中提供的 join 方法。 与 tree shaking 配合，将 lodash library 中的其余没有用到的导出去除
  // join: ['lodash', 'join'],
  'regenerator-runtime': require.resolve('regenerator-runtime/runtime'),
  'core-js': require.resolve('core-js/stable'),
};
// 自动加载模块，而不必到处 import 或 require. 开发模式下optimization.concatenateModules设为false，可使用ProvidePlugin
exports.providePlugin = new ProvidePlugin(config);