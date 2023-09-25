import bcrypt from 'bcrypt';

const bcryptWrapper = {
    createHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    isValidPassword: async (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }
};

export default bcryptWrapper;
