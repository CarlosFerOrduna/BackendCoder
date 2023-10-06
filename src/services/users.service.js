import userModel from '../dao/models/users.model.js'

export default class UserService {
    createUser = async (user) => {
        try {
            const newUser = new userModel(user)
            await newUser.validate()

            return await newUser.save()
        } catch (error) {
            throw new Error('createUser: ' + error.toString())
        }
    }

    getUserById = async (uid) => {
        try {
            const user = await userModel.findById(uid)
            if (!user) {
                throw new Error('user not exists')
            }

            return user
        } catch (error) {
            throw new Error('getUserById: ' + error.toString())
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email })

            return user
        } catch (error) {
            throw new Error('getUserByEmail: ' + error.toString())
        }
    }

    getUserByUsername = async (username) => {
        try {
            const user = await userModel.findOne({ username })

            return user
        } catch (error) {
            throw new Error('getUserByUsername: ' + error.toString())
        }
    }

    updateUser = async (user) => {
        try {
            const result = await userModel.findOneAndUpdate({ email: user.email }, user)
            if (!result) {
                throw new Error('user not exists')
            }

            return result
        } catch (error) {
            throw new Error('updateUser: ' + error.toString())
        }
    }

    deleteUser = async (uid) => {
        try {
            const user = await userModel.findByIdAndDelete(uid)
            if (!user) {
                throw new Error('user not exists')
            }

            return user
        } catch (error) {
            throw new Error('deleteUser: ' + error.toString())
        }
    }
}
