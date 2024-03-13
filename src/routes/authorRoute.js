import { Router } from 'express'
import { AuthorController } from '../controllers/authorController.js'

export const authorRouter = Router()

authorRouter
  .get('/', AuthorController.getAll)
  .get('/:authorId', AuthorController.getById)
  .post('/', AuthorController.create)
  .delete('/:authorId', AuthorController.delete)
