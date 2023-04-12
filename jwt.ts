import { sign, verify } from 'jsonwebtoken'

export const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user.id}, 'jwtsecret', { expiresIn: '1h'})
    console.log(accessToken)
    return accessToken
}