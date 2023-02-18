import log4js from 'log4js'

log4js.configure({
    appenders: {
        console: { type: 'console' },
        warnFile: { type: 'file', filename: 'warn.log' },
        errorFile: { type: 'file', filename: 'error.log' },

        logConsole: { type: 'logLevelFilter', appender: 'console', level: 'trace' },
        logWarnFile: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn' },
        logErrorFile: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
    },

    categories: {
        default: { appenders: ['console'], level: 'trace' },
        development: { appenders: ['logConsole', 'logWarnFile', 'logErrorFile'], level: 'all' }
    }
})

export const logger = log4js.getLogger('development')
