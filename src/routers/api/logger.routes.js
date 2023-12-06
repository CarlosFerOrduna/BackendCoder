import BaseRouter from '../BaseRouter.js'

export default class LoggerRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], (req, res) => {
            const { logger } = req

            logger.fatal('This is a fatal log.')
            logger.error('This is an error log.')
            logger.warning('This is a warning log.')
            logger.info('This is an info log.')
            logger.debug('This is a debug log.')
            logger.http('This is an http log.')

            res.send('Logs generated successfully.')
        })
    }
}
