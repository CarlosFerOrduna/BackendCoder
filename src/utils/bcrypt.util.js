import bcrypt from 'bcryptjs'

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const isValidPassword = async (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export { createHash, isValidPassword }
