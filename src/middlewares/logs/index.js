import winston from 'winston'
import config from '../../config/dotenv.config.js'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

const commonFormat = winston.format.combine(
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.simple()
)

const createConsoleTransport = (level) =>
    new winston.transports.Console({ level, format: commonFormat })

const createFileTransport = (level) =>
    new winston.transports.File({ filename: './errors.log', level, format: commonFormat })

const loggerDev = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [createConsoleTransport('debug')]
})

const loggerPrd = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [createFileTransport('error'), createConsoleTransport('info')]
})

const loggers = { prd: loggerPrd, dev: loggerDev }

export const addLogger = (req, res, next) => {
    const time = new Date().toLocaleTimeString()
    req.logger = loggers[config.logger]
    req.logger.info(`${req.method} en ${req.url} - ${time}`)

    const originalJson = res.json
    res.json = function (body) {
        req.logger.info(`response:`, body)

        originalJson.call(res, body)
    }

    next()
}
