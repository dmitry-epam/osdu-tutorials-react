const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const proxyPort = process.env.SERVER_PORT || '8080';
const proxyHost = process.env.SERVER_HOST || 'server';
app.use('/api', proxy(`http://${proxyHost}:${proxyPort}`));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);
