const alias = require('../resolve.alias');

module.exports = {
  webpack: (config, webpack) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader'],
      exclude: /node_modules/,
    });

    Object.assign(config.resolve.alias, alias);

    config.resolve.extensions.push(
      '.tsx', '.ts',
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        API_GRAPHQL_ENDPOINT_LOCAL: JSON.stringify('https://local.huntd.tech/graphql'),
        API_GRAPHQL_TOKEN: JSON.stringify('BcIQ35vCfsDdF2AaGrXj'),
      }),
    );

    return config;
  },
};
