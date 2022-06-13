const log4js = require('log4js')

log4js.configure({
  appenders: {
    app: { type: 'console' },
    warningFile: { type: 'file', filename: './logs/warn.log' },
    errorFile: {type:'file',filename:'./logs/error.log'}
  },
  categories: {
    app: { appenders: ['app'], level: 'debug' },
    warning: { appenders: ['app','warningFile'], level: 'warn' },
    error:{appenders:['app','errorFile'],level:'error'},
    default: { appenders: ['app'], level: 'trace' }
  }
})

module.exports= log4js