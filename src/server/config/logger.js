'use strict';  /* eslint no-unused-vars: 0 */

const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('../config');

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      name: 'debug-file',
      level: 'debug',
      filename: path.join(config.serverPath, './logs/all.log'),
      handleExceptions: true,
      json: true,
      colorize: false,
    }),
    new DailyRotateFile({
      name: 'warn-file',
      level: 'warn',
      filename: path.join(config.serverPath, './logs/warn.log'),
      handleExceptions: true,
      json: true,
      colorize: false,
    }),
    new DailyRotateFile({
      name: 'error-file',
      level: 'error',
      filename: path.join(config.serverPath, './logs/error.log'),
      handleExceptions: true,
      json: true,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      prettyPrint: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
