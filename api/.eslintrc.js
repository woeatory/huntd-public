const path = require('path');

const resolve = {
  extensions: ['.js', '.ts'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
};

module.exports = {
  extends: [
    '@mate-academy/eslint-config-internal',
  ],
  plugins: ['@mate-academy/api'],
  rules: {
    // TODO: add to general config
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    '@mate-academy/api/use-case-file-name-suffix': ['error'],
    '@mate-academy/api/use-case-name-suffix': ['error'],
    '@mate-academy/api/use-case-options-name': ['error'],
    '@mate-academy/api/use-case-result-name': ['error'],
  },
  ignorePatterns: [
    '**/*/graphql/generated.ts',
    '**/node_modules/*',
    '**/dist/*',
    'UseCase.ts',
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: resolve.extensions,
        map: [
          ...Object.entries(resolve.alias),
        ],
      },
      node: {
        extensions: resolve.extensions,
      },
    },
  },
};
