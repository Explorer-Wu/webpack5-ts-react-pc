module.exports = {
  // 指定下面提到的所有选项 https://postcss.org/api/#processoptions
  // parser: 'sugarss',
  plugins: [
    // PostCSS 插件
    ['postcss-short', { prefix: 'x' }],
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-url',
    // 'postcss-cssnext'已被弃用，取而代之的是'postcss-preset-env'
    [
      'postcss-preset-env', 
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        browsers: 'last 5 versions'
      },
    ],
    ['autoprefixer', {
      // browsers: 'last 5 version',
      overrideBrowserslist: ['last 5 version', '>1%', 'ios 7'],
    }],
    'postcss-normalize',
    // require('postcss-nested'),  // 废弃的，将会在下一个主要版本中移除
    'cssnano' // cssnano基于 PostCSS 生态系统的 CSS 压缩工具
  ],
};
