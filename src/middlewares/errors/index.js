import errorCodes from '../../services/errors/enum.errors.js'

export default async (error, req, res, next) => {
    console.error(error)

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
