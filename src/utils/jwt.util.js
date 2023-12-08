import jwt from 'jsonwebtoken'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'

const generateToken = (user) => {
    const key = process.env.PRIVATE_KEY

    return jwt.sign({ user }, key, { expiresIn: '6000000' })
}

const authToken = (res, authorization) => {
    const key = process.env.PRIVATE_KEY

    if (!authorization) {
        CustomError.createError({
            name: 'not autenticated',
            cause: 'not autenticated',
            message: error.message,
            code: errorCodes.NOT_AUTENTICATE
        })
    }

    const token = authorization.replace('Bearer ', '')

    return jwt.verify(token, key, (error, credentiales) => {
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
    })
}

export { generateToken, authToken }
