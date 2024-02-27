import jwt from 'jsonwebtoken'

import { ErrorWrapper, codes } from '../middlewares/errors/index.js'
import config from '../config/index.js'

const SECRET_KEY = config.jwt.secretKey

const generateToken = (user) => {
    return jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' })
}

const authToken = ({ authorization }) => {
    if (!authorization || !authorization.includes('Bearer ')) {
        ErrorWrapper.createError({
            name: 'not autenticated',
            cause: 'not autenticated',
            message: 'unauthorized',
            code: codes.NOT_AUTENTICATE,
        })
    }

    const token = authorization.replace('Bearer ', '')

    return jwt.verify(token, SECRET_KEY, (error, credentials) => {
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
