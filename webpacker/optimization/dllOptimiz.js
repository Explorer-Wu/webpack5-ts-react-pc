exports.dllOptimiz = {
  // 如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。
  sideEffects: true, //打开移除未使用的模块
};