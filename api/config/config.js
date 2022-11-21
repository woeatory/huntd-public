const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialectOptions: {
    connectTimeout: 10000,
  },
  pool: {
    min: 0,
    max: 10,
    idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
    acquire: 30000, // ..., that pool will try to get connection before throwing error
  },
  encoding: 'unicode',
  timeout: 5000,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  logging: false,
  retry: { // Set of flags that control when a query is automatically retried.
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
      /SequelizeDatabaseError/,
    ],
    max: 4, // How many times a failing query is automatically retried.
  },
};

module.exports = {
  test: {
    ...config,
  },
  development: {
    ...config,
  },
  production: {
    ...config,
  },
};
