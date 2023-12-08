import errorCodes from '../../services/errors/enum.errors.js'

export default async (error, req, res, next) => {
    switch (error.code) {
        case errorCodes.INVALID_TYPES_ERROR:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(400).send({
                status: 'error',
                error: error.name,
                message: error.message
            })
            break
        case errorCodes.TOKEN_EXPIRED || errorCodes.NOT_AUTENTICATE:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(401).send({
                status: 'error',
                error: error.name,
                message: error.message
            })
            break
        case errorCodes.USER_FORBIDDEN:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(403).send({
                status: 'error',
                error: error.name,
                message: error.message
            })
            break
        case errorCodes.ROUTING_ERROR:
            req.logger.warning(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(404).send({
                status: 'error',
                error: error.name,
                message: error.message
            })
            break
        case errorCodes.DATABASE_ERROR:
            req.logger.error(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(500).send({
                status: 'error',
                error: error.name,
                message: error.message
            })
            break
        default:
            req.logger.fatal(
                `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
            )
            res.status(500).send({
                status: 'error',
                error: 'Unhandler error',
                message: error.message
            })
            break
    }
}
