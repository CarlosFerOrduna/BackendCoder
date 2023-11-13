import UserDTO from '../dao/dto/users.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createUser = async (user) => {
        const userDto = new UserDTO(user, 'database')
        return await this.dao.createUser(userDto)
    }

    getUserById = async (uid) => {
        const userDto = await this.dao.getUserById(uid)
        return new UserDTO(userDto, 'response')
    }

    getUserByEmail = async (email) => {
        const userDto = await this.dao.getUserByEmail(email)
        return new UserDTO(userDto, 'bcrypt')
    }

    getUserByUsername = async (username) => {
        const userDto = await this.dao.getUserByUsername(username)
        return new UserDTO(userDto, 'response')
    }

    updateUser = async (user) => {
        const userDto = await this.dao.updateUser(user)
        return new UserDTO(userDto, 'response')
    }

    deleteUser = async (uid) => {
        const userDto = await this.dao.deleteUser(uid)
        return new UserDTO(userDto, 'response')
    }
}
