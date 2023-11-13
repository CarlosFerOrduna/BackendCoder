export default class UserDTO {
    constructor(user) {
        this.firstName = user.firstName || null
        this.lastName = user.lastName || null
        this.email = user.email || null
        this.age = user.age || null
        this.username = user.username || null
        this.password = user.password || null
        this.rol = user.rol || null
    }
}
