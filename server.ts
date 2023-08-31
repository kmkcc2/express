import express from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './routes/users'
import authRoutes from './routes/auth'
import cors from 'cors'
import dotenv from 'dotenv'
import authorize from './middleware/authorize'
import verifyContent from './middleware/verify-content-type'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(cors())

const userRouter = usersRoutes
app.use('/users', verifyContent, authorize, userRouter)
app.use('/', verifyContent, authRoutes)

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`)
})
