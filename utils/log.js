import  log4js  from 'log4js'

log4js.configure({

    appenders:{

        myConsole: { type: 'console' },
        myFileError: { type:'file', filename:'./utils/logs/error.log'},
        myFileWarning: { type:'file', filename:'./utils/logs/warn.log'}
    },

    categories:{

        default: { appenders: ['myConsole'], level: 'trace'},
        consola: { appenders: ['myConsole'], level: 'debug'},
        archivoError: { appenders: ['myFileError'], level:'error'},
        archivoWarning: { appenders: ['myFileWarning'], level:'warn'} 
    }
})

let logger = log4js.getLogger('consola')
let loggerError = log4js.getLogger('archivoError')
let loggerWarn = log4js.getLogger('archivoWarning')

export {logger, loggerError, loggerWarn}