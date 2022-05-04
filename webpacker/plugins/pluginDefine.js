const { DefinePlugin } = require('webpack');
const {isDev, isProd, mode} = require('../utils');

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(mode),
    },
    // 'process.env': require('../config/test.env')
    IS_PROD: isProd,
    IS_DEV: isDev,
    // IS_DEV_SERVER: isDevServer,
};
// 测试环境使用
exports.definePlugin = new DefinePlugin(config);