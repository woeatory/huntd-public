module.exports = ({ env }) => ({
  email: {
    provider: 'amazon-ses',
    providerOptions: {
      key: env('AWS_KEY'),
      secret: env('AWS_SECRET'),
      amazon: 'https://email.eu-west-1.amazonaws.com',
    },
    settings: {
      defaultFrom: 'Huntd Admin <no-reply@huntd.tech>',
    },
  },
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_KEY'),
      secretAccessKey: env('AWS_SECRET'),
      region: env('AWS_REGION'),
      params: {
        Bucket: env('FILES_HANDLER_BUCKET'),
      },
    },
  },
});
