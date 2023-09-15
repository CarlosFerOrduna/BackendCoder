import userService from '../services/users.service.js';

const userController = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, age, password, rol } = req.body;
            const newUser = { firstName, lastName, email, age, password, rol };
            const result = await userService.createUser(newUser);

            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
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
            const { uid } = req.params;
            const { firstName, lastName, email, age, password, rol } = req.body;
            let newUser = {};

            if (firstName) newUser.firstName = firstName;
            if (lastName) newUser.lastName = lastName;
            if (email) newUser.email = email;
            if (age) newUser.age = age;
            if (password) newUser.password = password;
            if (rol) newUser.rol = rol;

            const result = await userService.updateUser(uid, newUser);

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
            const { email, password } = req.query;
            const result = await userService.login(email, password);

            req.session.registerSuccess = true;

            return res.status(200).json({
                status: 'success',
                message: 'login success',
                data: result
            });
        } catch (error) {
            req.session.registerFailed = true;

            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    logout: async (req, res) => {
        try {
            return res.status(200).json({
                status: 'proccess',
                message: 'login proccess',
                data: {}
            });
        } catch (error) {
            req.session.registerFailed = true;

            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    }
};

export default userController;
