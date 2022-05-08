exports.devOptimiz = {
  // runtimeChunk: {
  //   name: 'runtime', // 自定义runtime文件的name
  // },
  splitChunks: {
    chunks: "all",
  },
  // tree shaking通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
  // tree shaking开发环境下的基础配置: 模块只导出被使用的成员  usedExports开启后会移除未被使用的成员
  // usedExports的目的是标注出哪些函数是没被使用的，然后配合Terser将没用的函数在打包的时候删掉
  // usedExports: true, //依赖于 terser 去检测语句中的副作用。不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。
};