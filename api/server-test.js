const express = require('express');

module.exports = function makeServer(router) {
  const server = express();

  server.use(express.json());
  server.use('/', router);

  return server;
};
