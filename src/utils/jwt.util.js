import jwt from 'jsonwebtoken'

import { ErrorWrapper, codes } from '../middlewares/errors/index.js'

const generateToken = (user) => {
    return jwt.sign({ user }, config.privateKey, { expiresIn: '1h' })
}

const authToken = ({ authorization }) => {
    if (!authorization || !authorization.incldes('Bearer ')) {
        ErrorWrapper.createError({
            name: 'not autenticated',
            cause: 'not autenticated',
            message: 'unauthorized',
            code: codes.NOT_AUTENTICATE,
        })
    }

    const token = authorization.replace('Bearer ', '')

    return jwt.verify(token, config.privateKey, (error, credentials) => {
        if (error?.message.includes('expired')) {
            ErrorWrapper.createError({
                name: 'token expired',
                cause: 'token expired',
                message: error.message,
                code: codes.TOKEN_EXPIRED,
            })
        }

        if (error) {
            ErrorWrapper.createError({
                name: 'forbidden',
                cause: 'forbidden',
                message: error.message,
                code: codes.USER_FORBIDDEN,
            })
        }

        return credentials
    })
}

export { authToken, generateToken }
