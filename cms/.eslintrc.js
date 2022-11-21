const alias = require('./resolve.alias');

module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-internal',
  ],
  ignorePatterns: [
    '**/*/graphql/api/*.generated.ts',
    '**/*/graphql/cms/*.generated.ts',
    '**/dist/*',
  ],
  rules: {
    camelcase: ['off'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ...Object.entries(alias),
        ],
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    },
  },
};
