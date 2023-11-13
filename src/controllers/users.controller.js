import { userService } from '../repositories/index.js'
import { createHash, isValidPassword } from '../utils/bcrypt.util.js'
import { generateToken } from '../utils/jwt.util.js'

class UserController {
    constructor() {
        this.userService = userService
    }

    createUser = async (req, res) => {
        try {
            const { firstName, lastName, email, age, username, password, rol } = req.body
            if (!firstName || !isNaN(firstName)) throw new Error('firstName is not valid')
            if (!lastName || !isNaN(lastName)) throw new Error('lastName is not valid')
            if (!email || !isNaN(email)) throw new Error('email is not valid')
            if (!age || isNaN(age)) throw new Error('age is not valid')
            if (!username || !isNaN(username)) throw new Error('username is not valid')
            if (!password || !isNaN(password)) throw new Error('password is not valid')
            if (!rol || !isNaN(rol)) throw new Error('rol is not valid')

            const user = { firstName, lastName, email, age, username, password, rol }
            const result = await this.userService.createUser(user)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
                data: result
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    getUser = async (req, res) => {
        try {
            const { uid } = req.params
            if (!uid || !isNaN(uid)) throw new Error('uid is not valid')

            const result = await this.userService.getUserById(uid)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    updateUser = async (req, res) => {
        try {
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

            const result = await this.userService.updateUser(newUser)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully updated',
                data: result
            })
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            if (!uid || !isNaN(uid)) throw new Error('uid is not valid')

            await this.userService.deleteUser(uid)

            return res.status(204).json({})
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !email.includes('@')) throw new Error('email is not valid')
            if (!password) throw new Error('password is not valid')

            const data = await this.userService.getUserByEmail(email)
            if (!isValidPassword(data, password))
                throw new Error('something went wrong: ' + data)

            const user = await this.userService.getUserById(data._id)
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
        } catch (error) {
            this.#returnError(res, error)
        }
    }

    current = async (req, res) => {
        try {
            const { user } = req.session
            if (!user) throw new Error('user is not exists')

            const data = await this.userService.getUserById(user._id)
            return res.json(data)
        } catch (error) {
            this.#returnError(res, error)
        }
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
        return res.send({
            status: 'success',
            message: 'success'
        })
    }

    githubCallBack = async (req, res) => {
        req.session.user = req.user
        return res.redirect('/views/products')
    }

    failLogin = (req, res) => {
        return res.send({ status: 'error', message: 'failed login' })
    }

    failRegister = (req, res) => {
        return res.send({ status: 'error', message: 'failed register' })
    }

    #returnError = (res, error) => {
        return res.status(400).json({
            status: 'error',
            message: error.message,
            data: {}
        })
    }
}

const userController = new UserController()

export default userController
