import { Router } from 'express'

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
        this.router.post(
            path,
            this.handlePolicies(policies),
            uploadMultipleImages,
            this.applyCallbacks(callbacks),
        )
    }

    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            uploadMultipleImages,
            this.applyCallbacks(callbacks),
        )
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

            const { authorization } = req.headers
            const result = authToken(authorization)

            if (result?.code) {
                return res.status(result.code).send({
                    status: 'error',
                    message: result.message,
                })
            }

            req.user = result

            next()
        }
    }
}
