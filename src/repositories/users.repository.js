import UserDTO from '../dao/dto/users.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createUser = async (user) => {
        const userDto = new UserDTO(user, 'database')
        return await this.dao.createUser(userDto)
    }

    searchUsers = async (limit, page, query) => {
        const users = await this.dao.searchUsers(limit, page, query)
        return users.docs.map((u) => new UserDTO(u, 'search'))
    }

    searchUsersViews = async (limit, page) => {
        const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
            await this.dao.searchUsers(limit, page)

        return {
            docs: docs.map((u) => new UserDTO(u, 'response')),
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage
        }
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

    getEmailsUsersInactive = async () => {
        return await this.dao.getEmailsUsersInactive()
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
