const path = require('path');

const isProd = ['production', 'prod', 'test', 'pre'].includes(process.env.NODE_ENV);

module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },

  globals: {
    $: true
  },

  // 解析器
  parser: '@typescript-eslint/parser', 

  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 6, // 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    createDefaultProgram: true,
  },

  // 继承的规则 [扩展]
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // 'react-app',
    'plugin:prettier/recommended',
    // 'prettier',
    // 'plugin:jsx-control-statements/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
    'prettier/react'
  ],

  // 插件
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'], // 'jsx-control-statements',

  // 规则
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    '@typescript-eslint/indent': ['error', 4, { VariableDeclarator: 4, SwitchCase: 1 }],
    "@typescript-eslint/interface-name-prefix": 'off',
    "@typescript-eslint/explicit-member-accessibility": 'off',
    "@typescript-eslint/no-triple-slash-reference": 'off',
    "@typescript-eslint/ban-ts-ignore": 'off',
    "@typescript-eslint/no-this-alias": 'off',
    "@typescript-eslint/triple-slash-reference": ['error', { "path": "always", "types": "never", "lib": "never" }],
    
    'import/no-dynamic-require': 'off',
    // These rules don't add much value, are better covered by TypeScript and good definition files

    // React相关校验规则
    'react/no-direct-mutation-state': 'off',
    'react/no-deprecated': 'off',
    'react/no-string-refs': 'off',
    'react/require-render-return': 'off',
    'react/jsx-filename-extension': [
        'warn',
        {
            extensions: ['.jsx', '.tsx'],
        },
    ], // also want to use with ".tsx"
    'react/prop-types': 'off', // Is this incompatible with TS props type?
    "react/jsx-indent": [2, 4],
    "react/jsx-no-undef": [2, { allowGlobals: true }],
    // "jsx-control-statements/jsx-use-if-tag": 'off',

    'prettier/prettier': 1,
    'no-debugger': isProd ? 'warn' : 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    "eqeqeq": ['warn', 'always'],
    "prefer-const": ['error', {"destructuring": "all", "ignoreReadBeforeAssign": true}],
  },
  
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // webpack: {
      //   config: './config/webpack.base.js',
      // },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        directory: './tsconfig.json',
      },
    },
    'import/ignore': ['types'], // Weirdly eslint cannot resolve exports in types folder (try removing this later)
  },
};
