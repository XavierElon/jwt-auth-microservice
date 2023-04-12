import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { connectToDatabase } from './src/connections/mongodb'
import { User } from './src/models/user.model'

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
