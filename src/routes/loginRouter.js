import { Router } from 'express'
import { LoginController } from '../controllers/loginController.js'

export const loginRouter = Router()

loginRouter
  .post('/', LoginController.login)
  .post('/validate', LoginController.validate)
