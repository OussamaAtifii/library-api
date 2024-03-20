import express, { json } from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import dotenv from 'dotenv'

import { booksRoute } from './routes/bookRoute.js'
import { authorRouter } from './routes/authorRoute.js'
import { userRouter } from './routes/userRouter.js'
import { loginRouter } from './routes/loginRouter.js'

dotenv.config()

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(logger('dev'))
app.use('/api/books', booksRoute)
app.use('/api/authors', authorRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(`Error while connecting to database: ${error}`))
