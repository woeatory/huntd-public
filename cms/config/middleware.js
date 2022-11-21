module.exports = {
  load: {
    before: ['gzip'],
  },
  settings: {
    favicon: {
      path: 'favicon.ico',
      maxAge: 86400000,
    },
    gzip: {
      enabled: true,
      options: {
        br: false,
      },
    },
  },
};
