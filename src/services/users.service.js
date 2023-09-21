import userModel from '../dao/models/users.model.js';

const userService = {
    createUser: async (user) => {
        try {
            const newUser = new userModel(user);
            await newUser.validate();

            return await newUser.save();
        } catch (error) {
            throw new Error('insertUser: ' + error.message);
        }
    },
    getUser: async (uid) => {
        try {
            const user = await userModel.findById(uid);
            if (!user) {
                throw new Error('user not exists');
            }

            return user;
        } catch (error) {
            throw new Error('getUser: ' + error.message);
        }
    },
    updateUser: async (uid, user) => {
        try {
            const user = await userModel.findByIdAndUpdate(uid, user);
            if (!user) {
                throw new Error('user not exists');
            }

            return user;
        } catch (error) {
            throw new Error('updateUser: ' + error.message);
        }
    },
    deleteUser: async (uid) => {
        try {
            const user = await userModel.findByIdAndDelete(uid);
            if (!user) {
                throw new Error('user not exists');
            }

            return user;
        } catch (error) {
            throw new Error('deleteUser: ' + error.message);
        }
    },
    login: async (email, password) => {
        try {
            const user = await userModel.findOne({ email, password });
            if (!user) {
                throw new Error('User not exists');
            }

            return user;
        } catch (error) {
            throw new Error('login: ' + error.message);
        }
    }
};

export default userService;