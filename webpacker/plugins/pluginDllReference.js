const { DllReferencePlugin } = require('webpack');
const { resolve } = require("../utils");

const config = {
  //content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
  context: resolve("libs"), //(绝对路径) manifest (或者是内容属性)中请求的上下文
  manifest: resolve("libs/reactvendors-dll-manifest.json"), //包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
  //dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
  name: "./libs/reactvendors.dll.js", // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  // dll 是如何暴露的 (libraryTarget)
  sourceType: "umd", //对应 dll.config 中的 libraryTarget: 'umd'  //sourceType: "commonsjs",
  scope: "reactvendors", //dll 中内容的前缀
}

exports.dllReferencePlugin = new DllReferencePlugin(config);