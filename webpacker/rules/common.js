const { tsLoader, babelLoader, tsJsThreadLoader } = require("./useLoaderRules");
const { resolve } = require("../utils");
const { useWorkerPool } = require("../env");
/**
 * @see https://webpack.js.org/guides/typescript/#loader
 */
exports.typescriptRule = {
	test: /\.(ts|tsx)$/,
	use: [useWorkerPool && tsJsThreadLoader, "babel-loader", tsLoader],
	exclude: /\/node_modules\//,
	// include: [
	//   resolve("./src"),
	//   resolve("./libs"),
	//   resolve("./tests"),
	// ]
};
/**
 * @see https://webpack.js.org/loaders/babel-loader
 */
exports.javascriptRule = {
	test: /\.(js|jsx)$/,
	use: [useWorkerPool && tsJsThreadLoader, babelLoader],
	//启用debug 用于故障排查。默认 false
	// debug: true,
	exclude: /\/node_modules\//,
	// include: [
	//   resolve("./src"),
	//   resolve("./libs"),
	//   resolve("./tests"),
	// ],
};

exports.javascriptPreRule = {
	test: /\.(js|jsx)$/,
	/**
	 *  pre:优先执行
	 *  post:延后执行
	 *  不设置enforce则顺序执行
	 */
	enforce: "pre",
	use: ["source-map-loader"],
	//启用debug 用于故障排查。默认 false
	// debug: true,
	exclude: /\/node_modules\//,
	// include: [
	//   resolve("./src"),
	//   resolve("./libs"),
	//   resolve("./tests"),
	// ],
};

exports.tsJsRules = {
	test: /\.(js|jsx|ts|tsx)$/,
	use: [useWorkerPool && tsJsThreadLoader, "babel-loader", tsLoader],
	exclude: /\/node_modules\//,
	// include: [
	//   resolve("./src"),
	//   resolve("./libs"),
	//   resolve("./tests"),
	// ]
};

/**
 * @see https://webpack.js.org/loaders/html-loader
 */
exports.htmlRule = {
	test: /\.(html)$/,
	use: {
		loader: "html-loader",
	},
	// exclude: /\/node_modules\//
};

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
exports.imagesRule = {
	test: /\.(?:ico|gif|png|jpe?g|webp)$/i,
	type: "asset/resource",
	generator: {
		filename: "static/images/[hash][ext][query]",
	},
	exclude: /\/node_modules\//,
};
// options: {
//   limit: 10000,
//   name: utils.pathRelative("images/[name].[hash:7].[ext]"),
// },

exports.fontsRule = {
	test: /\.(woff(2)?|eot|ttf|otf|)(\?.*)?$/,
	type: "asset/inline",
	exclude: /\/node_modules\//,
};
