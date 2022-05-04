const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve, isProd } = require("../utils");

const defaultConfig = {
    cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!profile.json',
        '!tsconfig.tsbuildinfo',
    ],
};
const dllConfig = {
    root: resolve("libs"), // 绝对路径 utils.resolve('/dist'),
    verbose: true, // 是否显示到控制台
    dry: false, // 不删除所有
}

const mergeConfig = isProd ? defaultConfig : dllConfig;

// 每次打包前清空
exports.cleanPlugin = new CleanWebpackPlugin(mergeConfig) // new CleanWebpackPlugin(config);