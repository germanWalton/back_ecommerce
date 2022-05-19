const log4js = require('./log4')
const logger = log4js.getLogger


module.exports = {
  log: (msg, level = "info") => logger('app').info(msg),
  warn: (msg) => logger('warning').warn(msg),
  error: (msg, e) => logger('error').error(msg),
  info: (msg) => logger().info(msg)
};
