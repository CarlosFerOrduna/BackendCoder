import { userService } from '../repositories/index.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../services/errors/info.errors.js'
import { createHash, isValidPassword } from '../utils/bcrypt.util.js'
import { generateToken } from '../utils/jwt.util.js'

class UserController {
    createUser = async (req, res) => {
        const { firstName, lastName, email, age, username, password, rol } = req.body
        if (!firstName || !isNaN(firstName)) {
            CustomError.createError({
                name: 'firstName is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'firstName',
                    type: 'string',
                    value: firstName
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!lastName || !isNaN(lastName)) {
            CustomError.createError({
                name: 'lastName is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'lastName',
                    type: 'string',
                    value: lastName
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!email || !isNaN(email)) {
            CustomError.createError({
                name: 'email is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'email',
                    type: 'string',
                    value: email
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!age || isNaN(age)) {
            CustomError.createError({
                name: 'age is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'age',
                    type: 'string',
                    value: age
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!password || !isNaN(password)) {
            CustomError.createError({
                name: 'password is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'password',
                    type: 'string',
                    value: password
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!rol || !isNaN(rol)) {
            CustomError.createError({
                name: 'rol is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'rol',
                    type: 'string',
                    value: rol
                }),
                message: 'Error to register user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const user = { firstName, lastName, email, age, username, password, rol }
        const result = await userService.createUser(user)

        return res.status(201).json({
            status: 'success',
            message: 'user successfully created',
            data: result
        })
    }

    getUser = async (req, res) => {
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            CustomError.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({ name: 'uid', type: 'string', value: uid }),
                message: 'Error to get user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await userService.getUserById(uid)

        return res.status(201).json({
            status: 'success',
            message: 'user successfully found',
            data: result
        })
    }

    updateUser = async (req, res) => {
        const { firstName, lastName, email, age, password, rol, cart, tickets } = req.body
        const { _id } = req.session.user
        let newUser = { _id }

        if (firstName) newUser.firstName = firstName
        if (lastName) newUser.lastName = lastName
        if (email) newUser.email = email
        if (age) newUser.age = age
        if (password) newUser.password = createHash(password)
        if (rol) newUser.rol = rol
        if (cart) newUser.cart = cart
        if (tickets) newUser.tickets = tickets

        const result = await userService.updateUser(newUser)

        return res.status(201).json({
            status: 'success',
            message: 'user successfully updated',
            data: result
        })
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            CustomError.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({ name: 'uid', type: 'string', value: uid }),
                message: 'Error to delete user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        await userService.deleteUser(uid)

        return res.status(204).json({})
    }

    login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !email.includes('@')) {
            CustomError.createError({
                name: 'email is not valid',
                cause: invalidFieldErrorInfo({ name: 'email', type: 'string', value: email }),
                message: 'Error to login user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }
        if (!password) {
            CustomError.createError({
                name: 'password is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'password',
                    type: 'string',
                    value: password
                }),
                message: 'Error to login user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const data = await userService.getUserByEmail(email)
        if (!isValidPassword(data, password)) throw new Error('something went wrong: ' + data)

        const user = await userService.getUserById(data._id)
        const token = generateToken(user)

        req.session.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            rol: data.rol,
            tickets: user.tickets
        }

        return res.status(200).header('authorization', token).json({
            user: user,
            accessToken: token
        })
    }

    current = async (req, res) => {
        const { user } = req.session
        if (!user) {
            CustomError.createError({
                name: 'user is not valid',
                cause: invalidFieldErrorInfo({ name: 'user', type: 'string', value: user }),
                message: 'Error to current user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const data = await userService.getUserById(user._id)
        return res.json(data)
    }

    logout = async (req, res) => {
        // TODO: Analizar
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err)
            } else {
                res.redirect('/views/users/login')
            }
        })
    }

    github = async (req, res) => {
        return res.json({
            status: 'success',
            message: 'success'
        })
    }

    githubCallBack = async (req, res) => {
        req.session.user = req.user
        return res.redirect('/views/products')
    }

    failLogin = (req, res) => {
        return res.json({ status: 'error', message: 'failed login' })
    }

    failRegister = (req, res) => {
        return res.json({ status: 'error', message: 'failed register' })
    }
}

const userController = new UserController()

export default userController
