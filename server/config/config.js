'use strict';

const env = process.env.NODE_ENV || 'dev';

let config;
try {
  config = require(`./config.${env}.json`);
} catch {
  throw new Error(`[config] Missing server/config/config.${env}.json — copy config.example.json and fill in values.`);
}

module.exports = config;
