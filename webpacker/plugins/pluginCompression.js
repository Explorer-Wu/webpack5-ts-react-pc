const CompressionWebpackPlugin = require('compression-webpack-plugin')
const envConfig = require('../env');

const config = {
  filename: '[path].gz[query]',
  algorithm: 'gzip', // 压缩算法
  test: new RegExp(
      '\\.(' +
      envConfig.build.productionGzipExtensions.join('|') +
      ')$'
  ),
  // cache: true,
  // include: /\/includes/, 所有包含(include)的文件
  // exclude: /\/excludes/, 所有排除(exclude)的文件
  threshold: 10240, // 只压缩大于 10240 bytes 的chunk
  minRatio: 0.8  // 只压缩大于该值的 minRatio = Compressed Size / Original Size
};
// 生产环境使用
exports.compressionPlugin = new CompressionWebpackPlugin(config);
  