import express, { json } from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'

import { booksRoute } from './routes/bookRoute.js'

dotenv.config()

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(logger('dev'))
app.use('/api/books', booksRoute)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})
