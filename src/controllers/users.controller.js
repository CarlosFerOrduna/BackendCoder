import UserService from '../services/users.service.js'
import { createHash, isValidPassword } from '../utils/bcrypt.util.js'
import { generateToken } from '../utils/jwt.util.js'

class UserController {
    constructor() {
        this.userService = new UserService()
    }

    createUser = async (req, res) => {
        try {
            const { firstName, lastName, email, age, username, password, rol } = req.body
            const user = { firstName, lastName, email, age, username, password, rol }
            const result = await this.userService.createUser(user)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: {}
            })
        }
    }

    getUser = async (req, res) => {
        try {
            const { uid } = req.params
            const result = await this.userService.getUserById(uid)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: {}
            })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { firstName, lastName, email, age, password, rol } = req.body
            let newUser = {}

            if (firstName) newUser.firstName = firstName
            if (lastName) newUser.lastName = lastName
            if (email) newUser.email = email
            if (age) newUser.age = age
            if (password) newUser.password = createHash(password)
            if (rol) newUser.rol = rol

            const result = await this.userService.updateUser(newUser)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: {}
            })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            await this.userService.deleteUser(uid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: {}
            })
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body

            const data = await this.userService.login(email)

            if (!isValidPassword(data, password)) {
                throw new Error('something went wrong: ' + data)
            }

            const token = generateToken(data)

            // todo: tengo dudas de si esto esta bien o mal que lo siga haciendo
            req.session.user = {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                age: req.user.age,
                rol: req.user.rol
            }

            return res.status(200).cookie(token).json({
                accessToken: token,
                expiresIn: '10m',
                user: data
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: {}
            })
        }
    }

    current = async (req, res) => {
        const { email } = req.body
        if (!email) {
            return res.redirect('/login')
        }

        const data = await this.userService.getUserByEmail(email)

        return res.render('current', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        })
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
        console.log(req)
        req.session.user = req.user
        return res.redirect('/views/products')
    }

    failLogin = (req, res) => {
        return res.send({ status: 'error', message: 'failed login' })
    }

    failRegister = (req, res) => {
        return res.send({ status: 'error', message: 'failed register' })
    }
}

const userController = new UserController()

export default userController
