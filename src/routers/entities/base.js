import { Router } from 'express'

import { ErrorWrapper, codes } from '../../middlewares/errors/index.js'
import { uploadMultipleImages } from '../../middlewares/multer/index.js'
import { authToken } from '../../utils/jwt.util.js'

export default class BaseRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    init() {}

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), uploadMultipleImages, this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), uploadMultipleImages, this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            await callback.apply(this, params)
        })
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            if (policies.includes('public')) return next()

            const authorization = req?.headers?.Authorization || req?.cookies?.Authorization

            const { user } = authToken({ authorization })

            if (!user?.rol || !policies.includes(user.rol)) {
                ErrorWrapper.createError({
                    name: 'forbidden',
                    cause: 'can not add your product in your cart',
                    message: 'error add product in cart',
                    code: codes.USER_FORBIDDEN,
                })
            }

            req.user = user
            next()
        }
    }
}
