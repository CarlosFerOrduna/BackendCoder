import UserDTO from '../dao/dto/users.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createUser = async (user) => {
        const userDto = new UserDTO(user)
        return await this.dao.createUser(userDto)
    }

    getUserById = async (uid) => {
        return await this.dao.getUserById(uid)
    }

    getUserByEmail = async (email) => {
        return await this.dao.getUserByEmail(email)
    }

    getUserByUsername = async (username) => {
        return this.dao.getUserByUsername(username)
    }

    updateUser = async (user) => {
        return this.dao.updateUser(user)
    }

    deleteUser = async (uid) => {
        return await this.dao.deleteUser(uid)
    }
}
