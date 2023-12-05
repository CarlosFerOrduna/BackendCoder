import { Router } from 'express'
import { authToken } from '../utils/jwt.util.js'

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
        this.router.post(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return async (req, res, next) => {
            try {
                for (const callback of callbacks) {
                    await callback.call(this, req, res, next)
                }
            } catch (error) {
                next(error)
            }
        }
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            if (policies.includes('public')) return next()

            const { authorization } = req.headers
            const user = authToken(res, authorization)

            req.user = user

            next()
        }
    }
}
