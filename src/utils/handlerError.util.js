import { codes } from '../middlewares/errors/index.js'

export const handlerError = (error, res) => {
    let status
    switch (error.code) {
        case codes.INVALID_TYPES_ERROR:
        case codes.MAILER:
            status = 400
            break
        case codes.TOKEN_EXPIRED:
        case codes.NOT_AUTENTICATE:
            status = 401
            break
        case codes.USER_FORBIDDEN:
            status = 403
            break
        case codes.ROUTING_ERROR:
        case codes.NOT_FOUND:
            status = 404
            break
        case codes.DATABASE_ERROR:
            status = 500
            break
        default:
            status = 500
            break
    }

    return res.status(status).send({
        status: 'error',
        error: error.name,
        message: error.message,
    })
}
