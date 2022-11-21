const { jwtSecret } = require('../extensions/users-permissions/config/jwt');

module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: 1337,
  url: env('API_HOST_PUBLIC')
    ? `https://${env('API_HOST_PUBLIC')}/cms-api`
    : '/cms-api',
  cron: {
    enabled: false,
  },
  admin: {
    auth: {
      secret: jwtSecret,
    },
    autoOpen: false,
    host: '0.0.0.0',
    url: `https://${env('API_HOST_PUBLIC')}/admin`,
  },
});
