import jwt from 'jsonwebtoken'
import { createTransport } from 'nodemailer'

import config from '../config/dotenv.config.js'
import { cartService, userService } from '../repositories/index.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../services/errors/info.errors.js'
import { createHash, isValidPassword } from '../utils/bcrypt.util.js'
import { authToken, generateToken } from '../utils/jwt.util.js'
import { format } from 'date-fns'

class UserController {
    createUser = async (req, res, next) => {
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

        const cart = await cartService.createCart()

        const user = {
            firstName,
            lastName,
            email,
            age,
            username,
            password,
            rol,
            cart: cart._id
        }

        const result = await userService.createUser(user)

        return { result }
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

    searchUsers = async (req, res) => {
        const { limit, page, firstName, lastName, email, age, username, rol, lastConnection } =
            req.query

        let query = {}
        if (firstName) query.firstName = firstName
        if (lastName) query.lastName = lastName
        if (email) query.email = email
        if (age) query.age = age
        if (username) query.username = username
        if (rol) query.rol = rol
        if (lastConnection) query.lastConnection = lastConnection

        const result = await userService.searchUsers(limit, page, query)

        return res.status(200).json({
            status: 'success',
            message: 'user successfully found',
            data: result
        })
    }

    updateUser = async (req, res) => {
        const { firstName, lastName, email, age, password, rol, cart, tickets } = req.body
        const user = req?.session?.user || req?.user?.user
        const { _id } = user
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

    deleteInactiveUsers = async (req, res) => {
        const emailsUsersInavtive = await userService.getEmailsUsersInactive()
        console.log('length:', emailsUsersInavtive.length)
        if (emailsUsersInavtive.length < 1) {
            return res.json({
                status: 'success',
                message: 'there are no users with last connection more than two days old',
                data: []
            })
        }

        const transport = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.emailUser,
                pass: config.emailPass
            }
        })

        await transport.sendMail({
            from: `ecommerce <${config.emailUser}>`,
            to: emailsUsersInavtive.join(', '),
            subject: 'Usuario eliminado por inactividad',
            html: ` <div style="text-align: center;">
                        <p>Su cuenta fue eliminada por falta de uso</p>
                    </div>`
        })

        return res.json({
            status: 'success',
            message: 'user successfully deleted',
            data: emailsUsersInavtive
        })
    }

    #login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
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
        if (!isValidPassword(data, password)) {
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
        const user = await userService.getUserById(data._id)
        const token = generateToken(user)

        user.lastConnection = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        await userService.updateUser(user)

        const { _id, firstName, lastName, age, rol, tickets, cart } = user
        req.session.user = { _id, firstName, lastName, email, age, rol, cart, tickets }

        return { user, token }
    }

    loginApi = async (req, res) => {
        const { user, token } = await this.#login(req, res)

        return res.status(200).header('authorization', token).json({
            user: user,
            accessToken: token
        })
    }

    loginViews = async (req, res) => {
        const { token } = await this.#login(req, res)

        return res.cookie('authorization', token).redirect('/views/products')
    }

    registerApi = async (req, res, next) => {
        const { result } = await this.createUser(req, res, next)

        return res.status(201).json({
            status: 'success',
            message: 'user successfully created',
            data: result
        })
    }

    registerViews = async (req, res, next) => {
        await this.createUser(req, res, next)

        return res.redirect('/views/users/login')
    }

    #current = async (req, res) => {
        const user = req?.user?.user || req?.session?.user
        if (!user) {
            CustomError.createError({
                name: 'user is not valid',
                cause: invalidFieldErrorInfo({ name: 'user', type: 'string', value: user }),
                message: 'Error to current user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const data = await userService.getUserById(user._id)
        return { data }
    }

    currentApi = async (req, res) => {
        const { data } = await this.#current(req, res)
        return res.json(data)
    }

    currentViews = async (req, res) => {
        const { data } = await this.#current(req, res)
        const { firstName, lastName, email } = data

        return res.render('current', { firstName, lastName, email })
    }

    logoutApi = async (req, res) => {
        try {
            const authorization = req?.headers?.authorization || req?.cookies?.authorization
            const { user } = authToken(authorization)

            user.lastConnection = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            await userService.updateUser(user)

            res.clearCookie('connect.sid').clearCookie('authorization')

            req.session.destroy((err) => {
                if (err) {
                    console.error('Error al destruir la sesión:', err)
                    throw new Error(err)
                }

                res.json({
                    status: 'success',
                    message: 'Logout successful',
                    data: null
                })
            })
        } catch (error) {
            CustomError.createError({
                name: 'error logout',
                cause: 'no user logged in',
                message: error.message,
                code: errorCodes.NOT_AUTENTICATE
            })
        }
    }

    logoutViews = async (req, res) => {
        res.clearCookie('connect.sid').clearCookie('authorization')
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

    restoreMailer = async (req, res) => {
        try {
            const { email } = req.body

            const token = generateToken(email)

            const transport = createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: config.emailUser,
                    pass: config.emailPass
                }
            })

            await transport.sendMail({
                from: `ecommerce <${config.emailUser}>`,
                to: email,
                subject: 'Restaurar contraseña',
                html: ` <div style="text-align: center;">
                            <p>Haga click en el siguiente <a href="http://localhost:${config.port}/views/users/restore/${token}">enlace</a> para reestablecer su contraseña</p>
                        </div>`
            })

            return res.redirect('/views/users/login')
        } catch (error) {
            CustomError.createError({
                name: 'error mailer',
                cause: error.message,
                message: error.message,
                code: errorCodes.MAILER
            })
        }
    }

    restorePassword = async (req, res) => {
        const { token } = req?.params

        if (token && !isNaN(token)) {
            CustomError.createError({
                name: 'error token',
                cause: 'token is not valid',
                message: 'error in verify restore password',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        let err = null
        const result = jwt.verify(token, config.privateKey, (error, credentials) => {
            if (error?.message.includes('expired')) {
                err = error.message
            }

            return credentials
        })

        if (!err) res.cookie('credentials', result.user)

        res.render(err ? 'restore-mailer' : 'restore-password', {
            title: 'restore-password'
        })
    }

    verify = async (req, res) => {
        const { password } = req.body
        const user = req?.cookies?.credentials

        if (!password) {
            return res.render('restore-password', {
                title: 'restore-password',
                equalPassword: false,
                emptyPassword: true
            })
        }

        const result = await userService.getUserByEmail(user)

        if (await isValidPassword(result, password)) {
            return res.render('restore-password', {
                title: 'restore-password',
                equalPassword: true,
                emptyPassword: false
            })
        }

        await userService.updateUser({ _id: result._id, password: createHash(password) })

        return res.clearCookie('credentials').redirect('/views/users/login')
    }

    changeRol = async (req, res) => {
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            CustomError.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({ name: 'uid', type: 'string', value: uid }),
                message: 'Error to change rol user',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const transitions = { user: 'premium', premium: 'user' }

        const user = await userService.getUserById(uid)

        if (user.rol === 'user') {
            const requiredNames = [
                'identificacion',
                'comprobante de domicilio',
                'comprobante de estado de cuenta'
            ]

            if (!requiredNames.every((n) => user.documents.some((d) => d.name === n))) {
                const hasNames = user.documents?.join(', ') || ''
                const missingNames = requiredNames
                    .map((n) => {
                        if (!user.documents?.includes(n)) return n
                    })
                    .join(', ')

                CustomError.createError({
                    name: 'pending documents',
                    cause: 'must have all documents',
                    message: `user has these documents '${hasNames}', needs these '${missingNames}'`,
                    code: errorCodes.INVALID_TYPES_ERROR
                })
            }
        }

        user.rol = transitions[user.rol]
        const result = await userService.updateUser(user)
        return res.status(201).json({
            status: 'success',
            message: 'user successfully updated',
            data: result
        })
    }

    addDocuments = async (req, res) => {
        const { uid } = req.params
        const { files } = req

        const documents = files.map((doc) => {
            const reference = `http://localhost:${config.port}/documents/${doc.filename}`
            const name = doc.filename
                .split('-')
                .slice(1)
                .join(' ')
                .replace(/\.[^/.]+$/, '')

            return { name, reference }
        })

        const result = await userService.updateUser({ _id: uid, documents })

        return res.status(201).json({
            status: 'success',
            message: 'user successfully updated',
            data: result
        })
    }
}

const userController = new UserController()

export default userController
