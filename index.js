const Client = require('./lib/client');

module.exports = function(apiKey) {
  return new Client(apiKey);
};