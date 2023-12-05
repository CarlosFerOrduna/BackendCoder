import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../../services/errors/info.errors.js'
import userModel from './models/users.model.js'

export default class Users {
    createUser = async (user) => {
        const newUser = new userModel(user)
        await newUser.validate()

        return await newUser.save()
    }

    getUserById = async (uid) => {
        const user = await userModel.findById(uid)
        if (!user) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user
                }),
                message: 'Error to get user',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return user
    }

    getUserByEmail = async (email) => {
        const user = await userModel.findOne({ email })
        if (!user) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user
                }),
                message: 'Error to get user',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return user
    }

    getUserByUsername = async (username) => {
        const user = await userModel.findOne({ username })
        if (!user) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user
                }),
                message: 'Error to get user',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return user
    }

    updateUser = async (user) => {
        const result = await userModel.findByIdAndUpdate(user._id, user, { new: true })
        if (!user) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user
                }),
                message: 'Error to update user',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return result
    }

    deleteUser = async (uid) => {
        const user = await userModel.findByIdAndDelete(uid)
        if (!user) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user
                }),
                message: 'Error to delete user',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return user
    }
}
