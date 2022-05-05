exports.devOptimiz = {
  // runtimeChunk: {
  //   name: 'runtime', // 自定义runtime文件的name
  // },
  splitChunks: {
    chunks: "all",
  },
  //tree shaking通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
  // 模块只导出被使用的成员
  // usedExports: true,//依赖于 terser 去检测语句中的副作用。不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。
  
  //库的Tree Shaking,比如lodash. Webpack默认忽略了sideEffect标注，改变此行为需要设置optimization.sideEffects为true。你能手工设置它或通过设置mode:"production"模式也行。

  // 通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
  sideEffects: true, //更为有效 是因为它允许跳过整个模块/文件和整个文件子树。需在package.json中设置， 否则影响less和scss的加载
};