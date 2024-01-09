import { subDays, subMilliseconds } from 'date-fns'
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
                code: errorCodes.NOT_FOUND
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
                code: errorCodes.NOT_FOUND
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
                code: errorCodes.NOT_FOUND
            })
        }

        return user
    }

    getEmailsUsersInactive = async () => {
        const emailsUsersInactive = await userModel.find(
            {
                $and: [
                    {
                        $or: [
                            { lastConnection: { $lt: subDays(new Date(), 2) } },
                            { lastConnection: null },
                            { lastConnection: undefined }
                        ]
                    },
                    { rol: { $eq: 'user' } }
                ]
            },
            'email'
        )

        await userModel.deleteMany({ email: { $in: emailsUsersInactive.map((u) => u.email) } })

        return emailsUsersInactive
    }

    searchUsers = async (limit, page, query = {}) => {
        return await userModel.paginate(query, { limit: limit ?? 10, page: page ?? 1 })
    }

    updateUser = async (user) => {
        const result = await userModel.findByIdAndUpdate(user._id, user, { new: true })
        if (!result) {
            CustomError.createError({
                name: 'user does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result
                }),
                message: 'Error to update user',
                code: errorCodes.NOT_FOUND
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
                code: errorCodes.NOT_FOUND
            })
        }

        return user
    }
}
