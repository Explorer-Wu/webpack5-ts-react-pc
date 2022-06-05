const ESLintPlugin = require("eslint-webpack-plugin");
const { useWorkerPool } = require("../env");
const { resolve } = require("../utils");
/**
 * 语法检查： eslint
 * 注意：只检查自己写的源代码，第三方的库是不用检查的
 * 你提供的配置选项会传给 ESLint 类。 这是一组和你在 package.json 与 .eslintrc 所指定选项不同的选项。 请查阅 eslint 文档
 */
const config = {
	context: resolve("./src"),
	extensions: ["js", "jsx", "ts", "tsx", "json", "react"], // 指定需要检查的扩展名
	threads: useWorkerPool, // 以线程池方式运行 lint 。线程池大小是自动的，除非你指定一个数值
	emitError: true, // 发送发现的错误
	emitWarning: true, // 发送发现的警告
	failOnError: true, // 任何错误都会导致模块构建（module build）失败
	// formatter: require.resolve("react-dev-utils/eslintFormatter"),
	eslintPath: require.resolve("eslint"),
};

exports.eslintPlugin = new ESLintPlugin(config);
