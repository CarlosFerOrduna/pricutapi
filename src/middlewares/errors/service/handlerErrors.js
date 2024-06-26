import moment from 'moment'

import { codes } from '../enum/codes.js'

export const handlerErrors = (err, req, res, next) => {
    const logError = (status, logMethod) => {
        req.logger[logMethod](`${req.method} in ${req.url} - ${moment().format('YYYY-MM-DD HH:mm:ss')} ${err}`)

        return res.status(status).send({
            status: 'error',
            error: err.name,
            message: err.message,
        })
    }

    switch (err.code) {
        case codes.INVALID_TYPES_ERROR:
        case codes.MAILER:
            logError(400, 'error')
            break
        case codes.TOKEN_EXPIRED:
        case codes.NOT_AUTENTICATE:
            logError(401, 'error')
            break
        case codes.USER_FORBIDDEN:
            logError(403, 'error')
            break
        case codes.ROUTING_ERROR:
        case codes.NOT_FOUND:
            logError(404, 'warning')
            break
        case codes.DATABASE_ERROR:
            logError(500, 'error')
            break
        default:
            logError(500, 'fatal')
            break
    }
}
