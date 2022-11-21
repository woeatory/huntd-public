const path = require('path');

const resolve = {
  extensions: ['.ts', '.tsx', '.native.js', '.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
};

module.exports = {
  env: {
    es2020: true,
    'react-native/react-native': true,
  },
  extends: [
    '@mate-academy/eslint-config-react-internal',
  ],
  ignorePatterns: [
    '**/*/graphql/generated.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-native',
    'react-hooks',
  ],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'padded-blocks': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 2,
    'import/prefer-default-export': 0,
    'react/style-prop-object': 0,
    camelcase: 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ...Object.entries(resolve.alias),
        ],
        extensions: resolve.extensions,
      },
      node: {
        extensions: resolve.extensions,
      },
    },
  },
};
