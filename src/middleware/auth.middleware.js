import userModel from '../dao/models/users.model.js';

const auth = async (req, res, next) => {
    try {
        const { email, password } = req.params;

        const user = await userModel.find({ email, password });
        if (!user) {
            throw new Error('login failed, user not exists');
        }

        return next();
    } catch (error) {
        throw new Error('auth: ' + error.message);
    }
};

export default auth;
