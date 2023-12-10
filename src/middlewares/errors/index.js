import errorCodes from '../../services/errors/enum.errors.js'

export default async (error, req, res, next) => {
    const logError = (status, logMethod) => {
        req.logger[logMethod](
            `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()} ${error}`
        )

        if ([401, 403].includes(status) && req.originalUrl.includes('views')) {
            return res.redirect('/views/users/login')
        }

        return res.status(status).send({
            status: 'error',
            error: error.name,
            message: error.message
        })
    }

    switch (error.code) {
        case errorCodes.INVALID_TYPES_ERROR:
            logError(400, 'error')
            break
        case errorCodes.TOKEN_EXPIRED:
        case errorCodes.NOT_AUTENTICATE:
            logError(401, 'error')

            break
        case errorCodes.USER_FORBIDDEN:
            logError(403, 'error')

            break
        case errorCodes.ROUTING_ERROR:
            logError(404, 'warning')
            break
        case errorCodes.DATABASE_ERROR:
            logError(500, 'error')
            break
        default:
            logError(500, 'fatal')
            break
    }
}
