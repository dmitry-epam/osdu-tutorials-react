const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const findProxyPort = process.env.FIND_SERVER_PORT || '8080';
const findProxyHost = process.env.FIND_SERVER_HOST || 'server';
app.use(
  proxy('/api/find', {
    target: `http://${findProxyHost}:${findProxyPort}`,
    pathRewrite: {
      '^/api': '/', // rewrite path
    },
  })
);

const fetchProxyPort = process.env.FETCH_SERVER_PORT || '8080';
const fetchProxyHost = process.env.FETCH_SERVER_HOST || 'server';
app.use(
  proxy('/api/fetch', {
    target: `http://${fetchProxyHost}:${fetchProxyPort}`,
    pathRewrite: {
      '^/api': '/', // rewrite path
    },
  })
);

const authProxyPort = process.env.AUTH_SERVER_PORT || '8080';
const authProxyHost = process.env.AUTH_SERVER_HOST || 'server';
app.use(
  proxy('/api/auth', {
    target: `http://${authProxyHost}:${authProxyPort}`,
    pathRewrite: {
      '^/api': '/', // rewrite path
    },
  })
);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);
