const alias = require("./alias");

module.exports = {
  //webpack 解析模块时应该搜索的目录, （不适用于对 loader 解析）
  modules: [
    // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
    utils.resolve("libs"),
    utils.resolve("node_modules"),
    utils.resolve("src")
  ],

  //mainFields将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
  // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
  mainFields: ["jsnext:main", "browser", "main"], // 只采用main字段作为入口文件描述字段，减少搜索步骤

  //自动解析确定的扩展, require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
  extensions: [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".scss",
    ".less",
    ".tpl",
    "png",
    "jpg",
    "jpeg",
    "gif"
  ],
  //配置别名
  alias
};
