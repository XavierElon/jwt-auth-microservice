import { sign, verify } from 'jsonwebtoken'

export const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user.id}, 'jwtsecret', { expiresIn: '1h'})
    return accessToken
}

export const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token']

    if (!accessToken) return res.status(400).json({ error: 'User not authenticated' })

    try {
        const validToken = verify(accessToken, 'jwtsecret')
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch(err) {
        return res.status(400).json({ error: err })
    }
}