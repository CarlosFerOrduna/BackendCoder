import userService from '../services/users.service.js';
import { createHash } from '../utils/bcrypt.util.js';

class UserController {
    constructor() {}

    createUser = (req, res) => {
        try {
            return res.send({ status: 'success', message: 'user registered' });
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
            const result = await userService.getUserById(uid);

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

            await userService.updateUser(newUser);

            return res.redirect('/views/products');
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
            const result = await userService.deleteUser(uid);

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

    login = async (req, res) => {
        try {
            if (!req.user) {
                return res.status(400).send({
                    status: 'error',
                    message: 'invalid credentials'
                });
            }

            req.session.user = {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                age: req.user.age,
                rol: req.user.rol
            };

            res.send({
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

    logout = async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
            } else {
                res.redirect('/views/users/login');
            }
        });
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
