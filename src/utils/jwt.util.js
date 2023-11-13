import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    const key = process.env.PRIVATE_KEY

    return jwt.sign({ user }, key, { expiresIn: '6000000' })
}

const authToken = (res, authorization) => {
    const key = process.env.PRIVATE_KEY

    if (!authorization) return res.status(401).send({ message: 'not autenticated' })

    const token = authorization.replace('Bearer ', '')

    return jwt.verify(token, key, (error, credentiales) => {
        if (error?.message.includes('expired'))
            return res.status(401).send({ message: 'token expired' })
        if (error) return res.status(403).send({ message: 'forbidden' })
    })
}

export { generateToken, authToken }
