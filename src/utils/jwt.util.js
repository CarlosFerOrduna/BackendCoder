import jwt from 'jsonwebtoken'

const key = process.env.PRIVATE_KEY

const generateToken = (user) => {
    return jwt.sign(user.email, key, { expiresIn: '10m' })
}

const authToken = (req, res, next) => {
    const authHeader = req.header.authorization
    if (!authHeader) return res.status(401).send({ message: 'not autenticated' })

    const token = authHeader.replace('Bearer ', '')
    jwt.verify(token, key, (error, credentiales) => {
        if (error) return res.status(403).send({ message: 'forbidden' })

        req.user = credentiales.user

        next()
    })
}

export { generateToken, authToken }
