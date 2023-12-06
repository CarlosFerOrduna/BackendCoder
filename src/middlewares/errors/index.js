import errorCodes from '../../services/errors/enum.errors.js'

export default async (error, req, res, next) => {
    switch (error.code) {
        case errorCodes.INVALID_TYPES_ERROR:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(400).send({ status: 'error', error: error.name })
            break
        case errorCodes.DATABASE_ERROR:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(500).send({ status: 'error', error: error.name })
            break
        case errorCodes.ROUTING_ERROR:
            req.logger.warning(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(404).send({ status: 'error', error: error.name })
            break
        default:
            req.logger.fatal(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(500).send({ status: 'error', error: 'Unhandler error' })
            break
    }
}
