import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'

export default (error, req, res, next) => {
    req.use(
        '*',
        CustomError.createError({
            name: 'invalid route',
            cause: 'invalid route',
            message: 'invalid route',
            code: errorCodes.ROUTING_ERROR
        })
    )
    console.error(error.cause)

    switch (error.code) {
        case errorCodes.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.name })
            break
        case errorCodes.DATABASE_ERROR:
            res.status(500).send({ status: 'error', error: error.name })
            break
        case errorCodes.ROUTING_ERROR:
            res.status(404).send({ status: 'error', error: error.name })
            break
        default:
            res.status(500).send({ status: 'error', error: 'Unhandler error' })
            break
    }
}
