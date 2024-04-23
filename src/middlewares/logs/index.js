import moment from 'moment'
import winston from 'winston'

import config from '../../config/index.js'
import { colors, levels } from './enum/index.js'

const commonFormat = winston.format.combine(winston.format.colorize({ colors: colors }), winston.format.simple())

const createConsoleTransport = (level) => new winston.transports.Console({ level, format: commonFormat })

const createFileTransport = (level) =>
    new winston.transports.File({ filename: './errors.log', level, format: commonFormat })

const loggerDev = winston.createLogger({
    levels: levels,
    transports: [createConsoleTransport('debug')],
})

const loggerPrd = winston.createLogger({
    levels: levels,
    transports: [createFileTransport('error'), createConsoleTransport('info')],
})

export const loggers = { prd: loggerPrd, dev: loggerDev }

export const handlerLogs = (req, res, next) => {
    req.logger = loggers[config.logger]
    req.logger.info(`${req.method} in ${req.url} - ${moment().format('YYYY-MM-DD HH:mm:ss')}`)

    const originalSend = res.send
    res.send = (body) => {
        req.logger.http(`response: ${body}`)
        originalSend.call(res, body)
    }

    next()
}
