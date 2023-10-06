import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    const key = process.env.PRIVATE_KEY

    return jwt.sign({ username: user.email }, key, { expiresIn: '6000000' })
}

const authToken = (req, res, next) => {
    const key = process.env.PRIVATE_KEY

    const { authorization } = req.headers

    console.log(authorization, authorization)
    if (!authorization) return res.status(401).send({ message: 'not autenticated' })

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, key, (error, credentiales) => {
        if (error) return res.status(403).send({ message: 'forbidden' })

        req.user = credentiales.user

        next()
    })
}

export { generateToken, authToken }
