import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './src/connections/mongodb'
import { User } from './src/models/user.model'
import { createTokens, validateToken } from './jwt'

// import { userRouter } from './src/routes/user.routes'

dotenv.config()

const app: Express = express()
const port: string = process.env.PORT || '17'
const host: string = process.env.HOST || 'http://localhost:'
const dbUri: string = process.env.MONGO_ATLAS_URI || ''
const dbName: string = process.env.DB_NAME || ''
const UriQueryParam: string = process.env.QUERY_PARAMETERS || ''

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
// app.use(userRouter)

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: 'JWT' })
})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            password: hash
        }).then(() => {
            res.json(username + ' REGISTERED')
        }).catch((err) => {
            if (err) {
                console.log('here')
                res.status(400).json({ error: err})
            }
        })
    })
    // return res.json({'username': username, 'password': password, 'fuck': 'fuck'})
})

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
        console.log('user does not exist')
        res.status(400).json({ error: 'User does not exist'})
    }
    const dbPassword = user?.password

    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({ error: 'Wrong password or username'})
        } else {
            const accessToken = createTokens(user)
            res.cookie('access-token', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            })
            res.json('Logged in')
        }

    })
})

app.get('/profile', validateToken, (req, res) => {
    res.json('profile')
})

try{
    app.listen(port, (): void => {
        /* eslint-disable no-console */
        console.log(`Connected successfully to ${host}${port}`)
    })
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`)
    /* eslint-enable no-console */
}

connectToDatabase(dbUri + dbName + UriQueryParam)
