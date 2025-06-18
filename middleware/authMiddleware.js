const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Autherization header missing or in the wrong format' })
    }

    const token = authHeader.split(' ')[1]

    // Validate the token:
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        req.user = verified
        next()

    } catch (err) {
        res.status(401).json({ error: 'invalid or expired token' })
    }
}

module.exports = {
    authenticate
}