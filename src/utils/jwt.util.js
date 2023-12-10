import jwt from 'jsonwebtoken'

import config from '../config/dotenv.config.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'

const generateToken = (user) => {
    return jwt.sign({ user }, config.privateKey, { expiresIn: '6000000' })
}

const authToken = (authorization) => {
    if (!authorization) {
        CustomError.createError({
            name: 'not autenticated',
            cause: 'not autenticated',
            message: 'Unauthorized',
            code: errorCodes.NOT_AUTENTICATE
        })
    }

    const token = authorization.replace('Bearer ', '')

    return jwt.verify(token, config.privateKey, (error, credentiales) => {
        if (error?.message.includes('expired')) {
            CustomError.createError({
                name: 'token expired',
                cause: 'token expired',
                message: error.message,
                code: errorCodes.TOKEN_EXPIRED
            })
        }
        if (error) {
            CustomError.createError({
                name: 'forbidden',
                cause: 'forbidden',
                message: error.message,
                code: errorCodes.USER_FORBIDDEN
            })
        }

        return credentiales
    })
}

export { authToken, generateToken }
