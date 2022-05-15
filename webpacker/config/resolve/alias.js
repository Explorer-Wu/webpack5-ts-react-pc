const { resolve } = require("../../utils");

//配置别名，在项目中可缩减引用路径
module.exports = {
  public: resolve("./public"), //path.join(__dirname, '../public'),
  "@@views": resolve("./src/views"),
  "@@router": resolve("./src/router"),
  "@@layouts": resolve("./src/layouts"),
  "@@components": resolve("./src/components"),
  "@@containers": resolve("./src/reduxstore/containers"),
  "@@actions": resolve("./src/reduxstore/actions"),
  "@@reducers": resolve("./src/reduxstore/reducers"),
  "@@store": resolve("./src/reduxstore/store"),
  "@@utils": resolve("./src/utils"),
  "@@assets": resolve("./src/assets"),
  "@@api": resolve("./src/api"),
  "@@": resolve("./src"),
  // "static": resolve("static"),
  // "mockserver": resolve("./mockserver"),
}