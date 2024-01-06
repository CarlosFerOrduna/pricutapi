import { Router } from 'express'

import { uploader } from '../../middlewares/multer/index.js'
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
            uploader.single('file'),

            this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            uploader.single('file'),
            this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                params[1].status(500).send(error.message)
            }
        })
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            try {
                if (policies.includes('public')) return next()

                const { authorization } = req.headers
                const result = authToken(authorization)

                if (result?.code) {
                    return res.status(result.code).json({
                        status: 'error',
                        message: result.message
                    })
                }

                req.user = result

                next()
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: error.message
                })
            }
        }
    }
}
