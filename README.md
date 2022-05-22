# WWebpack5 React+Ts SPA PC Template
> Webpack5 构建react+ts pc端单页面应用模版

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 
* 公共库或代码打包
```sh
    npm run dlls / yarn dlls
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
  "@pmmmwh/react-refresh-webpack-plugin" // 热更新 react 组件

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

* tree shaking需要注意的4点细节:
  1. 使用 ES2015 模块语法（即 import 和 export）。
  
  2. 确保没有编译器将 ES2015 模块语法转换为 CommonJS 模块（这是常用的 @babel/preset-env 的默认行为，详细信息请参阅文档）。
（注：babel升级到7后，没有特殊配置，babel默认不会转换掉 ESM 模块语法）
  
  3. 在项目的 package.json 文件中，添加 "sideEffects" 属性。
  （注：默认可以不写sideEffects，如果有需要某些文件不做tree shaking，可以加上）
  
  4. webpack默认只在 mode 为 "production" 的配置项启用，但是如果配置了不丑化压缩代码，webpack也会默认不是"production"，然后就没开启tree shaking。(注：不能关闭丑化压缩, 即optimization.minimize 此项不能设置为false，否者是导致 tree shaking 失效)

  tree shaking将 JavaScript 上下文中的未引用代码（Dead Code）移除，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
* Dead Code 一般具有以下几个特征：
  1. 代码不会被执行，不可到达；
  2. 代码执行的结果不会被用到；
  3. 代码只会影响死变量（只写不读）

* package.json 中，添加字段sideEffects:
  1. sideEffects 默认为 true， 告诉 Webpack ，所有文件都有副作用，他们不能被 Tree Shaking。
  2. sideEffects 为 false 时，告诉 Webpack ，没有文件是有副作用的，他们都可以 Tree Shaking。
  3. sideEffects 为一个数组时，告诉 Webpack ，数组中那些文件不要进行 Tree Shaking，其他的可以 Tree Shaking。

* sideEffects：摇树的作用范围
  1. package.json 中的配置：sideEffects: false（全都摇）
  2. 规则配置中的字段：sideEffects: true（控制全局文件不被摇掉）

* sideEffects 和 usedExports（更多被认为是 tree shaking）是两种不同的优化方式：
  1. sideEffects 更为有效 是因为它允许跳过整个模块/文件和整个文件子树。
  2. usedExports 依赖于 terser 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。

* scope hoisting（作用域提升）
scope hoisting 会将模块的结果进行预测，可以让webpack打包出的文件更小运行更快。scope hoisting（作用域提升） 的强大之处，是它通过webpack在打包时可将结果推断出来，将模块打散合并为一个函数极大的避免了代码的冗余。
scope hoisting也是基于ES6模块化规范，它是由webpack内置插件 ModuleConcateNationPlugin实现的。
在 production模式下默认配置 ModuleConcateNationPlugin插件，其他模式默认不开启。

* Runtime
Runtime 主要是指在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。

* Manifest
在代码经过编译打包之后，形成如 index.html 文件、一些 bundle 和各种资源加载到浏览器中，是不是 src 目录下的文件结构现在已经不存在了，那 webpack 如何管理所有模块之间的交互呢？这就是 manifest 数据的由来
当编译器开始执行，解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合成为 manifest，当完成打包并发送到浏览器时，会在运行时通过 manifest 来解析加载模块。无论选择哪种模块语法，那些 import 或 require 语句都已经转化为__webpack_require__方法，此方法指向模块标识符。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索背后对应的模块。
* webpack-manifest-plugin
通过配置webpack-manifest-plugin，生成manifest.json文件，用来对比js资源的差异，做到是否替换，当然，也要写缓存script
