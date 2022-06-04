exports.baseOptimiz = {
  //splitChunks（代码分割）主要就是根据不同的策略来分割打包出来的bundle
  splitChunks: {
    // 自动提取所有公共模块到单独 bundle；
    // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
    chunks: "all", // 默认‘async’。共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
    // 允许新拆出 chunk 的最小体积30k
    // minSize: 30 * 1024, // 模块超过30k自动被抽离成公共模块
    minSize: {
      javascript: 30 * 1024, // js模块超过30k自动被抽离成公共模块
      webassembly: 50 * 1024 // webassembly模块超过50k自动被抽离成公共模块
    },
    minRemainingSize: 0, // webpack5新属性，防止0尺寸的chunk
    minChunks: 1, // 最小公用模块次数，默认为1。模块最少被引用>=1次，才会拆分
    maxAsyncRequests: 6, // 按需加载时，最大并行加载文件数量
    maxInitialRequests: 10, // 入口点的最大并行请求数量<=10
    // 当模块大小大于100KB强行进行拆分忽略其他任何限制
    enforceSizeThreshold: 100000,
    automaticNameDelimiter: "~", // 命名分隔符
    //name 分割的js名称，默认为true，返回${cacheGroup的key} ${automaticNameDelimiter} ${moduleName},可以自定义。
    name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
    //cacheGroups缓存策略，默认设置了分割node_modules和公用模块。内部的参数可以和覆盖外部的参数。
    cacheGroups: {
      // 默认缓存组
      default: {
        // 模块缓存规则，设置为false，默认缓存组将禁用
        minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
        priority: -20, // 优先级， 该配置项是设置处理的优先级，数值越大越优先处理
        reuseExistingChunk: true // 是否复用存在的chunk，默认使用已有的模块，
      },
      defaultVendors: {
        // 匹配规则
        test: /[\\/]node_modules[\\/]/,
        chunks: "initial",
        // 权重，权重越大优先级越高 当模块匹配到多个缓存组中，最终根据权重决定要打包进哪个缓存组
        priority: 1,
        idHint: "vendors",
        // name: "vendor",
        reuseExistingChunk: false,
        enforce: true
      },
      // commons: {
      //   test: /[\\/]node_modules[\\/]/,
      //   name: 'vendor',
      //   chunks: 'initial',
      // },
      manifest: {
        name: "asset-manifest",
        chunks: "initial"
      },
      styles: {
        name: "styles",
        test: /\.((c|le|sa|sc)ss)$/i,
        chunks: "all", // merge all the css chunk to one file
        enforce: true
      }
    }
  },
  // runtimeChunk 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
  // ‘single’: 会生成一个唯一单独的runtime.js文件，就是manifest
  // { name: 'runtime', }：自定义runtime文件的name
  // multiple：和true一致。
  // 最小化 entry chunk, 为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
  runtimeChunk: true // 对于每个entry会生成runtime~${entrypoint.name}的文件

  // emitOnErrors默认为true,在编译出错时是否生成资源，使用 optimization.emitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false
  // emitOnErrors: true,

  // concatenateModules 告知 webpack 去寻找模块类型中的片段，哪些是可以安全地被合并到单一模块中。这取决于 optimization.providedExports 和 optimization.usedExports。
  //“作用域提升(scope hoisting)”, 仅适用于由 webpack 直接处理的 ES6 模块。在使用转译器(transpiler)时，你需要禁用对模块的处理（例如 Babel 中的 modules 选项）。
  // 默认 optimization.concatenateModules 在生产模式下被启用，而在其它情况下被禁用。
  // concatenateModules: true, // 尽可能合并每一个模块到一个函数中（Scop Hosting） 对应废弃插件：ModuleConcatenationPlugin
  //告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。 默认 optimization.providedExports 会被启用。
  // providedExports: true,
  // 压缩输出结果，usedExports开启后会移除未被使用的成员
  // minimize: true,
};
