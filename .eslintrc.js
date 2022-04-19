const path = require("path");

const isProd = ["production", "prod", "test", "pre"].includes(process.env.NODE_ENV);

module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true
  },

  // 解析器
  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaVersion: 6, // 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    },
    parser: "@typescript-eslint/parser",
    createDefaultProgram: true
  },

  // 继承的规则 [扩展]
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",
    // 'react-app',
    "plugin:prettier/recommended"
    // 'prettier',
  ],

  // 插件
  plugins: ["prettier", "react", "react-hooks", "jsx-a11y", "@typescript-eslint"],

  // 规则
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-dynamic-require": "off",
    // These rules don't add much value, are better covered by TypeScript and good definition files
    "react/no-direct-mutation-state": "off",
    "react/no-deprecated": "off",
    "react/no-string-refs": "off",
    "react/require-render-return": "off",

    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".tsx"]
      }
    ], // also want to use with ".tsx"
    "react/prop-types": "off", // Is this incompatible with TS props type?
    "no-debugger": isProd ? "warn" : "off"
  },

  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // webpack: {
      //   config: './config/webpack.base.js',
      // },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        directory: "./tsconfig.json"
      }
    },
    "import/ignore": ["types"] // Weirdly eslint cannot resolve exports in types folder (try removing this later)
  }
};
