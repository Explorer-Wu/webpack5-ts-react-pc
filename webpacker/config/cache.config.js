const path = require("path");
const envConfig = require("../env");
const { resolve } = require("../utils");

module.exports = {
  // 1. 将缓存类型设置为文件系统
  type: 'filesystem', // "memory" ｜ "filesystem"
  allowCollectingMemory: true,
  cacheDirectory: resolve('.temp_cache'),
  // cacheDirectory: resolve('./node_modules/.cache/webpack5'),
  compression: envConfig.build.productionGzip ? 'gzip' : false,
  buildDependencies: {
    // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
    config: [__filename],
    // 3. 如果你有其他的东西被构建依赖，可以在这里添加它们
    // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
  },
  store: 'pack',
};