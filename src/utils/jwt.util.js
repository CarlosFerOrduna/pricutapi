import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: `${15 * 60 * 1000}` })
}

const authToken = (userization) => {
    if (!userization) return { code: 401, message: 'not autenticated' }

    const token = userization.replace('Bearer ', '')

    return jwt.verify(token, process.env.SECRET_KEY, (error, credentiales) => {
        if (error) return { code: 403, message: 'forbidden' }
    })
}

export { generateToken, authToken }
