import log4js from 'log4js'

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'logs.log' },

        // Appenders compuestos
        logConsole: { type: 'logLevelFilter', appender: 'console', level: 'trace' },
        logFile: { type: 'logLevelFilter', appender: 'file', level: 'trace' }
    },

    categories: {
        default: { appenders: ['console'], level: 'trace' },
        prod: { appenders: ['logConsole', 'logFile'], level: 'all' },
        // console: { appenders: ['console'], level: 'trace' },
        // file: { appenders: ['file'], level: 'trace' }
    }
})

export const logger = log4js.getLogger('prod')
