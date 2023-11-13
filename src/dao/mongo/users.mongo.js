import userModel from './models/users.model.js'

export default class Users {
    createUser = async (user) => {
        try {
            const newUser = new userModel(user)
            await newUser.validate()

            return await newUser.save()
        } catch (error) {
            throw new Error('createUser: ' + error)
        }
    }

    getUserById = async (uid) => {
        try {
            const user = await userModel.findById(uid)
            if (!user) throw new Error('user not exists')

            return user
        } catch (error) {
            throw new Error('getUserById: ' + error)
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email })
            if (!user) throw new Error('user is not exists')

            return user
        } catch (error) {
            throw new Error('getUserByEmail: ' + error)
        }
    }

    getUserByUsername = async (username) => {
        try {
            const user = await userModel.findOne({ username })
            if (!user) throw new Error('user is not exists')

            return user
        } catch (error) {
            throw new Error('getUserByUsername: ' + error)
        }
    }

    updateUser = async (user) => {
        try {
            const result = await userModel.findOneAndUpdate({ email: user.email }, user)
            if (!result) throw new Error('user is not exists')

            return result
        } catch (error) {
            throw new Error('updateUser: ' + error)
        }
    }

    deleteUser = async (uid) => {
        try {
            const user = await userModel.findByIdAndDelete(uid)
            if (!user) throw new Error('user is not exists')

            return user
        } catch (error) {
            throw new Error('deleteUser: ' + error)
        }
    }
}
