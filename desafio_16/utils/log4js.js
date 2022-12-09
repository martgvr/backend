import log4js from 'log4js'

log4js.configure({
    appenders: {
        myConsole: { type: 'console' },
        myFile: { type: 'file', filename: 'logs.log' },

        // Appenders compuestos
        logConsole: { type: 'logLevelFilter', appender: 'myConsole', level: 'trace' },
        logFile: { type: 'logLevelFilter', appender: 'myFile', level: 'trace' }
    },

    categories: {
        default: { appenders: ['myConsole'], level: 'trace' },

        console: { appenders: ['myConsole'], level: 'trace' },
        file: { appenders: ['myFile'], level: 'trace' },

        prod: { appenders: ['logConsole', 'logFile'], level: 'all' }
    }
})

export const logger = log4js.getLogger('prod')
