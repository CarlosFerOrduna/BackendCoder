import { Router } from 'express'

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
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
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

    generateCustomResponses(req, res, next) {
        res.sendSuccess = (payload) => res.send({ status: 'success', payload })
        res.sendServerError = (error) => res.status(500).send({ status: 'error', error })
        res.sendClientError = (error) => res.status(400).send({ status: 'error', error })

        next()
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            try {
                if (policies.includes('public')) return next()

                const { authorization } = req.headers
                if (!authorization)
                    return res.status(401).send({ status: 'error', error: 'unauthorized' })

                const token = authorization.replace('Bearer ', '')
                const user = jwt.verify(token, process.env.PRIVATE_KEY)

                if (!policies.includes(user.role.toLowerCase()))
                    return res.status(403).send({ status: 'error', error: 'forbidden' })

                req.user = user

                next()
            } catch (error) {
                res.status(400).send({
                    status: 'error',
                    error: error.message
                })
            }
        }
    }
}
