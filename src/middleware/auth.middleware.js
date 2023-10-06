import userModel from '../dao/models/users.model.js'

const auth = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.redirect('/views/users/register')
        }

        req.session.firstName = user.firstName

        return next()
    } catch (error) {
        throw new Error('auth: ' + error.message)
    }
}

export default auth
