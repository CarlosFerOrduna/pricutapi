import moment from 'moment'
import errorCodes from '../enum/codes.js'

export const handlerErrors = async (error, req, res, next) => {
    const logError = (status, logMethod) => {
        req.logger[logMethod](`${req.method} in ${req.url} - ${moment()} ${error}`)

        return res.status(status).send({
            status: 'error',
            error: error.name,
            message: error.message
        })
    }

    switch (error.code) {
        case errorCodes.INVALID_TYPES_ERROR:
        case errorCodes.MAILER:
            logError(400, 'error')
            break
        case errorCodes.TOKEN_EXPIRED:
        case errorCodes.NOT_AUTENTICATE:
            logError(401, 'error')
            break
        case errorCodes.USER_FORBIDDEN:
            logError(403, 'error')
            break
        case errorCodes.ROUTING_ERROR:
        case errorCodes.NOT_FOUND:
            logError(404, 'warning')
            break
        case errorCodes.DATABASE_ERROR:
            logError(500, 'error')
            break
        default:
            logError(500, 'fatal')
            break
    }
}
