import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
})
