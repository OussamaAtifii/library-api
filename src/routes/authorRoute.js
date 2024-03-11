import { Router } from 'express'
import { AuthorController } from '../controllers/authorController.js'

export const authorRouter = Router()

authorRouter
  .get('/', AuthorController.getAll)
  .post('/', AuthorController.create)
  .delete('/:authorId', AuthorController.delete)
