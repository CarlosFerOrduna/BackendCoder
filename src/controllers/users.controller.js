import userService from '../services/users.service.js';
import bcriptWrapper from '../utils/bcript.utils.js';

const userController = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, age, password, rol } = req.body;
            const newUser = { firstName, lastName, email, age, password, rol };
            const result = await userService.createUser(newUser);

            req.session.firstName = result.firstName;

            return res.redirect('/views/products');
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const { uid } = req.params;
            const result = await userService.getUser(uid);

            return res.status(201).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstName, lastName, email, age, password, rol } = req.body;
            let newUser = {};

            if (firstName) newUser.firstName = firstName;
            if (lastName) newUser.lastName = lastName;
            if (email) newUser.email = email;
            if (age) newUser.age = age;
            if (password) newUser.password = bcriptWrapper.createHash(password);
            if (rol) newUser.rol = rol;

            const result = await userService.updateUser(newUser);

            return res.redirect('/views/products');
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    deleteUser: async (req, res) => {
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
                message: error.message,
                data: {}
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email);

            if (bcriptWrapper.isValidPassword(user, password)) {
                return res.redirect('/views/products');
            }

            return res.redirect('/views/users/login');
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
            } else {
                res.redirect('/views/users/login');
            }
        });
    }
};

export default userController;
