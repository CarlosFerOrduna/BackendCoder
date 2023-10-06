import UserService from '../services/users.service.js';
import { createHash } from '../utils/bcrypt.util.js';
import { generateToken } from '../utils/jwt.util.js';

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req, res) => {
        try {
            const { firstName, lastName, email, age, username, password, rol } = req.body;
            const user = { firstName, lastName, email, age, username, password, rol };
            const result = await this.userService.createUser(user);

            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: {}
            });
        }
    };

    getUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const result = await this.userService.getUserById(uid);

            return res.status(201).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: {}
            });
        }
    };

    updateUser = async (req, res) => {
        try {
            const { firstName, lastName, email, age, password, rol } = req.body;
            let newUser = {};

            if (firstName) newUser.firstName = firstName;
            if (lastName) newUser.lastName = lastName;
            if (email) newUser.email = email;
            if (age) newUser.age = age;
            if (password) newUser.password = createHash(password);
            if (rol) newUser.rol = rol;

            const result = await this.userService.updateUser(newUser);

            return res.status(201).json({
                status: 'success',
                message: 'user successfully updated',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: {}
            });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const result = await this.userService.deleteUser(uid);

            return res.status(204).json({});
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: {}
            });
        }
    };

    login = async (req, res) => {
        try {
            // TODO: Crear el token
            if (!req.user) {
                return res.status(400).send({
                    status: 'error',
                    message: 'invalid credentials'
                });
            }
            const token = generateToken(req);

            req.session.user = {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                age: req.user.age,
                rol: req.user.rol
            };

            res.cookies(token).send({
                status: 'success',
                payload: req.user
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: {}
            });
        }
    };

    current = async (req, res) => {
        const { user } = req;
        if (!user) {
            return res.redirect('/login');
        }

        const data = await this.userService.getUserByEmail(user);

        return res.render('current', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        });
    };

    logout = async (req, res) => {
        // TODO: Analizar
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
            } else {
                res.redirect('/views/users/login');
            }
        });
    };

    github = async (req, res) => {
        return res.send({
            status: 'success',
            message: 'success'
        });
    };

    githubCallBack = async (req, res) => {
        console.log(req);
        req.session.user = req.user;
        return res.redirect('/views/products');
    };

    failLogin = (req, res) => {
        return res.send({ status: 'error', message: 'failed login' });
    };

    failRegister = (req, res) => {
        return res.send({ status: 'error', message: 'failed register' });
    };
}

const userController = new UserController();

export default userController;
