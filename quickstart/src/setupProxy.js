const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api/find', {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/', // rewrite path
      },
    })
  );
  app.use(
    proxy('/api/fetch', {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/', // rewrite path
      },
    })
  );
  app.use(
    proxy('/api/auth', {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/', // rewrite path
      },
    })
  );
};
