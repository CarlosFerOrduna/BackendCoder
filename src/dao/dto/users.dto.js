import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'

export default class UserDTO {
    constructor(user, to) {
        switch (to) {
            case 'database':
                this.firstName = user.firstName || null
                this.lastName = user.lastName || null
                this.email = user.email || null
                this.age = user.age || null
                this.username = user.username || null
                this.password = user.password || null
                this.rol = user.rol || null
                this.cart = null
                this.tickets = []

                break
            case 'response':
                this._id = user._id || null
                this.firstName = user.firstName || null
                this.lastName = user.lastName || null
                this.username = user.username || null
                this.email = user.email || null
                this.age = user.age || null
                this.cart = user.cart || null
                this.tickets = user.tickets || []

                break

            case 'bcrypt':
                this._id = user._id || null
                this.password = user.password || null
                this.rol = user.rol || null

                break

            default:
                CustomError.createError({
                    name: 'Case not valid',
                    cause: 'Case not valid',
                    message: 'Case not valid',
                    code: errorCodes.INVALID_TYPES_ERROR
                })
        }
    }
}
