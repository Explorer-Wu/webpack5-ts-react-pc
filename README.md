# WWebpack5 React+Ts SPA PC Template
> Webpack5 构建react+ts pc端单页面应用模版

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 
* 公共库或代码打包
```sh
    npm run dlllibs / yarn dlllibs
``` 
* 开发环境服务启动
```sh
    npm run start / yarn start
``` 


Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### 生产坏境打包压缩
```sh
    npm run build / yarn build
``` 

### 生产环境打包并查看分析报告
```sh
    npm run build --report / yarn build --report
```

### 部署
拷贝dist文件夹至服务器即可

### 开发依赖package
* babel相关插件
  "@babel/cli": // 可以让babel以cli的方式执行  如：babel src --out-dir dist --watch
  "@babel/core": // babel 核心包
  <!-- "@babel/eslint-parser":  -->
  "@babel/plugin-transform-runtime": // 抽离提取 Babel的注入代码，防止重复加载，减小体积
  "@babel/preset-env": // 提供的预设，允许我们使用最新的JavaScript
  "@babel/preset-react": // react 支持
  "@babel/preset-typescript": // typescript 支持
  "@babel/runtime-corejs3": 
  <!-- "babel-plugin-dynamic-import-node": // 为node提供加载转换 import => require -->
  <!-- "@babel/plugin-syntax-dynamic-import":  // 动态导入、懒加载
  "@babel/plugin-transform-modules-commonjs":  // 转化成CommonJS 规范的代码
  "@babel/plugin-transform-react-constant-elements": // React 常量元素转换器 : 它会寻找不随 props 改变的所有静态元素，并将它们从渲染方法(或者无状态函数式组件)中抽离出来，以避免多余地调用 createElement
  "@babel/plugin-transform-react-inline-elements": // React 行内元素转换器 : 它会将所有 JSX 声明(或 者 createElement 调用)替换成优化过的版本，以便代码可以更快执行 -->
  
  <!-- "@babel/plugin-proposal-class-properties": // @babel/preset-env 插件已包含 -->
  <!-- "babel-plugin-import": "^1.13.3", // 按需引入、加载
  "babel-plugin-lodash": "^3.3.4", // 按需加载
  "babel-plugin-transform-react-remove-prop-types": "^0.4.24", // 从生产生成中删除不必要的类型 -->

* eslint相关插件
    eslint
    eslint-config-prettier // 关闭所有不必要或可能与[Prettier]冲突的规则
<!-- "eslint-config-ts-important-stuff" -->
<!-- "eslint-friendly-formatter" -->
<!-- "eslint-loader" -->
<!-- "eslint-plugin-flowtype" -->
    "eslint-plugin-jsx-a11y":  JSX元素的可访问性规则的静态AST检查器 
    "eslint-plugin-prettier": // 以 eslint的规则运行 prettier 格式化
    "eslint-plugin-react": // react 相关规则
    "eslint-plugin-react-hooks": // react-hooks 相关规则
    "eslint-plugin-import" // ES6+  import/export 语法支持
    "eslint-import-resolver-typescript": // 添加 ts 语法支持  eslint-plugin-import
    "eslint-import-resolver-webpack": // 支持 eslint-plugin-import 读写模块解析
    "@typescript-eslint/eslint-plugin" // 使 eslint 支持 typescript，.eslintrc.js 的 plugins 参数
    "@typescript-eslint/parser" // 使 eslint 支持 typescript ，.eslintrc.js 的 parser 参数
<!-- "eslint-plugin-redux-saga": // redux-saga 相关规则 -->
<!-- eslint-config-airbnb-typescript // airbnb 规范 -->

* webpack相关
  "webpack": v5
  "webpack-bundle-analyzer": // 包依赖分析 可视化
  "webpack-cli": // cli
  "webpack-dev-server": // dev-server 中间件，相当于webpack-dev-middleware和webpack-hot-middleware一起使用
  <!-- "webpack-dev-middleware": // 中间件，可配合 express以服务的方式开发使用
  "webpack-hot-middleware": // 热加载 -->
  "webpack-pwa-manifest": // 生成 pwa 相关配置
  "webpack-merge": // 合并配置工具  

* webpack plugin 插件
  "html-webpack-plugin": // 简化HTML文件的创建 ，配合webpack包含hash的bundle使用
  "mini-css-extract-plugin": // css 压缩
  "terser-webpack-plugin" // 使用 terser 压缩 js （terser 是一个管理和压缩 ES6+ 的工具）
  "clean-webpack-plugin": // 用于删除/清理生成的 build 文件 
  "copy-webpack-plugin": // 复制插件
  "compression-webpack-plugin": // Gzip压缩

* webpack loader：解析对应文件
  "babel-loader": // 解析js文件
  "style-loader": // 添加 css 到 HTML
  "css-loader":  // css加载器 处理 @import/url()
  "postcss-loader": // 处理 css
  "less-loader":  // less加载器 less => css
  "sass-loader":  // sass加载器 sass => css
  "file-loader":  // 通过 import/require() 加载的图片等解析为 url
  "html-loader": // 压缩HTML
  <!-- "svg-url-loader":  -->
  "url-loader": 
  "ts-loader":  // 将 TypeScript 转为 JavaScript
  <!-- "thread-loader":  -->

* 其他
    "typescript": "^4.3.5",
    "less": "^4.1.1", // less 的解析库
    "postcss": "^8.3.6", // 专门处理样式的工具
    "postcss-nested": "^5.0.6", // 解析处理嵌套规则
    "autoprefixer": "^10.3.1", // 自动生成各浏览器前缀 postcss 的一个插件
    "postcss-cssnext": "^3.1.1",
    "postcss-flexbugs-fixes": 
    "postcss-import":
    "postcss-normalize": 
    "postcss-preset-env": 
    "postcss-scss": 
    "postcss-url": 
  <!-- "serve": "^12.0.0", // 本地启动一个服务，可以查看静态文件 -->

* prettier 代码格式化
  "prettier": // 代码格式化工具
  "pretty-quick":  // 在更改的文件上运行 prettier

* 工具
  "husky": "^7.0.1", // 自动配置 Git hooks 钩子
  "lint-staged": "^11.1.2", // 对暂存的git文件运行linter
  "commitizen": // git commit 执行规则相关插件
  "conventional-changelog-cli":
  "rimraf": "^3.0.2", // 删除cli，兼容不同平台
  <!-- "yargs": "^17.1.0", // 读取命令参数 -->

