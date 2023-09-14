import express from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './src/routes/users'
import authRoutes from './src/routes/auth'
import cors from 'cors'
import { authorize } from './src/middleware/authorize'
import verifyContent from './src/middleware/verify-content-type'
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(verifyContent)

const userRouter = usersRoutes

app.use('/users', authorize, userRouter)
app.use('/', authRoutes)

export default app
