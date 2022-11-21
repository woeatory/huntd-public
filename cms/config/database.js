module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('POSTGRES_HOST', 'localhost'),
        port: env.int('POSTGRES_PORT', 5432),
        database: env('POSTGRES_DB', 'strapi'),
        username: env('POSTGRES_USER', 'strapi'),
        password: env('POSTGRES_PWD', 'strapi'),
      },
      options: {
        autoMigration: true,
      },
    },
  },
});
